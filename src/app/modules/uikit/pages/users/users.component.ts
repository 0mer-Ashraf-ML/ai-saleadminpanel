import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/modules/layout/services/auth.service';
import { Role, RoleDisplayNames } from 'src/app/enums/role.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/modules/layout/services/common.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  // State variables
  isAddModalBoxVisible = false;
  isUpdate = false;
  isDeleteModalBoxVisible = false;
  selectedUser: any | null = null;

  // Data
  users: any[] = [];
  RoleDisplayNames = RoleDisplayNames;
  roleOptions = [
    { label: 'Super Admin', value: Role.SuperAdmin },
    { label: 'Admin', value: Role.Admin },
    { label: 'User', value: Role.User },
  ];
  
  // Form
  userForm: FormGroup;

  // Services
  private readonly authService = inject(AuthService);

  constructor(private fb: FormBuilder, private toastr: ToastrService, private commonSrv: CommonService) {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const currentUser = this.commonSrv.getUser();
    if (Number(currentUser?.role) !== Number(Role.SuperAdmin)) {
      this.roleOptions = this.roleOptions.filter(
        option => option.value !== Role.SuperAdmin
      );
    }
  
    this.loadUsers();
  }


  // Utility
  getRoleDisplay(role: string | number): string {
    return this.RoleDisplayNames[+role as keyof typeof RoleDisplayNames];
  }

  // Load all users
  async loadUsers(): Promise<void> {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data.data;
        console.log('All Users: ', this.users);
      },
      error: (error) => {
        console.error('Error loading users', error);
        this.toastr.error('Failed to load users');
      },
    });
  }

  // Modal controls
  toggleAddModalBox(): void {
    this.isAddModalBoxVisible = !this.isAddModalBoxVisible;
    this.isUpdate = false;
  }

  toggleDeleteModalBox(): void {
    this.isDeleteModalBoxVisible = !this.isDeleteModalBoxVisible;
  }

  // Populate form for update
  update(id: string): void {
    this.isUpdate = true;
    this.isAddModalBoxVisible = true;
    this.selectedUser = this.users.find((user) => user.id === id);
    if(Number(this.selectedUser.role) === Role.SuperAdmin) {
      this.userForm.get('role')?.disable();
    }
    else{
      this.userForm.get('role')?.enable();
    }
    if (this.selectedUser) {
      this.userForm.patchValue({
        id: this.selectedUser.id,
        name: this.selectedUser.fullName,
        email: this.selectedUser.email,
        role: this.selectedUser.role,
      });
      console.log('Selected User', this.selectedUser);
    }
  }

  delete(id: string): void {
    this.selectedUser = this.users.find((user) => user.id === id);
    this.toggleDeleteModalBox();
  }

  async confirmDelete(): Promise<void> {
    if (!this.selectedUser) return;
  
    try {
      await lastValueFrom(this.authService.deleteUser(this.selectedUser.id));
      this.toastr.success('User deleted successfully');
      this.loadUsers();
    } catch (error: unknown) {
      console.error('Error deleting user:', error);
    
      if (error instanceof HttpErrorResponse) {
        this.toastr.error(error.error?.message || 'Failed to delete user');
      } else {
        this.toastr.error('Unexpected error occurred');
      }
    }
    
  
    this.toggleDeleteModalBox();
  }

  // Form submission
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    try {
      const res = await lastValueFrom(
        this.authService.updateUser(this.selectedUser.id, {
          role: this.userForm.value.role,
          fullName: this.userForm.value.name,
          email: this.userForm.value.email,
        })
      );
      this.toastr.success('User updated successfully');
      this.loadUsers();
    } catch (error) {
      this.toastr.error('Failed to update user');
      console.error('Error', error);
    }

    this.toggleAddModalBox();
  }
}