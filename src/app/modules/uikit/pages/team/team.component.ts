import { Component } from '@angular/core';
import { User } from '../table/model/user.model';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-team',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  isAddModalBoxVisible: boolean = false;
  isUpdate: boolean = false;
  isDeleteModalBoxVisible: boolean = false;

  toggleAddModalBox(): void {
    this.isAddModalBoxVisible = !this.isAddModalBoxVisible;
    this.isUpdate = false;
  }

  update(): void {
    this.isUpdate = !this.isUpdate;
    this.isAddModalBoxVisible = !this.isAddModalBoxVisible;
  }

  toggleDeleteModalBox():void {
    this.isDeleteModalBoxVisible = !this.isDeleteModalBoxVisible;
  }
dummyData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '+1-202-555-0156',
    website: 'johndoe.com',
    occupation: 'Software Engineer',
    hobbies: ['coding', 'hiking', 'reading'],
    selected: false,
    status: 1,
    created_at: '2024-10-12T12:34:56Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 25,
    username: 'janesmith',
    email: 'jane.smith@example.com',
    phone: '+1-202-555-0123',
    website: 'janesmith.net',
    occupation: 'Graphic Designer',
    hobbies: ['drawing', 'photography', 'travel'],
    selected: false,
    status: 1,
    created_at: '2024-10-14T12:34:56Z',
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 35,
    username: 'michaelb',
    email: 'michael.brown@example.com',
    phone: '+1-202-555-0189',
    website: 'michaelbrown.me',
    occupation: 'Data Scientist',
    hobbies: ['data analysis', 'cycling', 'music'],
    selected: true,
    status: 2,
    created_at: '2024-10-16T12:34:56Z',
  },
  {
    id: 4,
    name: 'Emily White',
    age: 28,
    username: 'emilyw',
    email: 'emily.white@example.com',
    phone: '+1-202-555-0147',
    website: 'emilywhite.org',
    occupation: 'Marketing Specialist',
    hobbies: ['writing', 'yoga', 'baking'],
    selected: false,
    status: 2,
    created_at: '2024-10-18T12:34:56Z',
  },
  {
    id: 5,
    name: 'David Johnson',
    age: 40,
    username: 'davidj',
    email: 'david.johnson@example.com',
    phone: '+1-202-555-0168',
    website: 'davidjohnson.co',
    occupation: 'Product Manager',
    hobbies: ['innovation', 'gaming', 'finance'],
    selected: true,
    status: 1,
    created_at: '2024-10-20T12:34:56Z',
  },
  {
    id: 6,
    name: 'Sarah Davis',
    age: 32,
    username: 'sarahd',
    email: 'sarah.davis@example.com',
    phone: '+1-202-555-0190',
    website: 'sarahdavis.dev',
    occupation: 'UI/UX Designer',
    hobbies: ['design', 'gardening', 'swimming'],
    selected: false,
    status: 1,
    created_at: '2024-10-22T12:34:56Z',
  },
  {
    id: 7,
    name: 'Chris Lee',
    age: 29,
    username: 'chrislee',
    email: 'chris.lee@example.com',
    phone: '+1-202-555-0134',
    website: 'chrislee.io',
    occupation: 'Mobile Developer',
    hobbies: ['app development', 'traveling', 'reading'],
    selected: false,
    status: 1,
    created_at: '2024-10-26T12:34:56Z',
  },
  {
    id: 8,
    name: 'Emma Wilson',
    age: 27,
    username: 'emmawilson',
    email: 'emma.wilson@example.com',
    phone: '+1-202-555-0175',
    website: 'emmawilson.tech',
    occupation: 'DevOps Engineer',
    hobbies: ['automation', 'gaming', 'blogging'],
    selected: true,
    status: 3,
    created_at: '2024-10-28T12:34:56Z',
  },
];

teams: any[] = [
  {
    name: 'xyx',
    email: 'test@test.com',
    role: 'abc',
  },
  {
    name: 'xyx',
    email: 'test@test.com',
    role: 'abc',
  },
  {
    name: 'xyx',
    email: 'test@test.com',
    role: 'abc',
  },
  {
    name: 'xyx',
    email: 'test@test.com',
    role: 'abc',
  },
  {
    name: 'xyx',
    email: 'test@test.com',
    role: 'abc',
  },
  {
    name: 'xyx',
    email: 'test@test.com',
    role: 'abc',
  },
  {
    name: 'xyx',
    email: 'test@test.com',
    role: 'abc',
  },
]

userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    console.log(this.userForm.value);

    this.toggleAddModalBox();
  }
}
