import { Component, inject } from '@angular/core';
import { User } from '../table/model/user.model';
import { CommonModule } from '@angular/common';
import { CompanyService } from 'src/app/modules/layout/services/company.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SpinnerService } from 'src/app/modules/layout/services/spinner.service';
import { TableFooterComponent } from "../table/components/table-footer/table-footer.component";

@Component({
  selector: 'app-projects',
  imports: [CommonModule, TableFooterComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  companies: any[] = [];
  private readonly companyService = inject(CompanyService);
  private readonly toastr = inject(ToastrService);
  private readonly spinner = inject(SpinnerService);

  ngOnInit(): void {
    this.fetchCompanies();
  }

  private fetchCompanies(): void {
    this.spinner.show();

    this.companyService
      .getCompanies()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (data: { data: any[] }) => {
          this.companies = data.data ?? [];

          if (this.companies.length > 0) {
            this.toastr.success(`${this.companies.length} companies loaded successfully`);
          } else {
            this.toastr.info('No companies found');
          }
        },
        error: (error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.companies = [];
              this.toastr.info('No companies found');
            } else {
              this.toastr.error(error.error?.message || 'Failed to load companies');
            }
          } else {
            this.toastr.error('An unexpected error occurred while loading companies');
          }
          console.error('Error fetching companies:', error);
        },
      });
  }
}
