import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize, lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from 'src/app/modules/layout/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/modules/layout/services/spinner.service';
import { TableFooterComponent } from '../table/components/table-footer/table-footer.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TableFooterComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  companies: any[] = [];
  isDeleteModalBoxVisible = false;
  isLoading = false;
  selectedCompany: any | null = null;
  isViewModalVisible = false;
  viewedCompany: any | null = null;

  private readonly companyService = inject(CompanyService);
  private readonly toastr = inject(ToastrService);
  private readonly spinner = inject(SpinnerService);

  ngOnInit(): void {
    this.fetchCompanies();
  }

  private fetchCompanies(): void {
    this.spinner.show();

    this.companyService
      .getAllCompanies()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (response: { data: any[] }) => {
          this.companies = response.data ?? [];
          console.log('Companies:', this.companies);

          if (this.companies.length > 0) {
            this.toastr.success(`${this.companies.length} companies loaded successfully`);
          } else {
            this.toastr.info('No companies found');
          }
        },
        error: (error: unknown) => {
          this.handleError(error, 'loading companies');
        },
      });
  }

  delete(id: string): void {
    this.selectedCompany = this.companies.find((company) => company.id === id);
    this.toggleDeleteModalBox();
  }

  async confirmDelete(): Promise<void> {
    if (!this.selectedCompany) return;

    this.isLoading = true;
    try {
      await lastValueFrom(this.companyService.deleteCompany(this.selectedCompany.id));
      this.toastr.success('Company deleted successfully');
      this.fetchCompanies();
    } catch (error: unknown) {
      this.handleError(error, 'deleting company');
    } finally {
      this.isLoading = false;
      this.toggleDeleteModalBox();
    }
  }

  toggleDeleteModalBox(): void {
    this.isDeleteModalBoxVisible = !this.isDeleteModalBoxVisible;
  }

  private handleError(error: unknown, context: string): void {
    this.isLoading = false;

    if (error instanceof HttpErrorResponse) {
      this.toastr.error(error.error?.message || `Failed while ${context}`);
    } else {
      this.toastr.error(`An unexpected error occurred while ${context}`);
    }

    console.error(`Error ${context}:`, error);
  }

  viewCompanyDetails(company: any): void {
    this.viewedCompany = company;
    this.isViewModalVisible = true;
  }

  closeViewModal(): void {
    this.isViewModalVisible = false;
    this.viewedCompany = null;
  }
}
