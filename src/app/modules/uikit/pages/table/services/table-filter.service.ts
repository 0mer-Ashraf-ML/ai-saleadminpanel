import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableFilterService {
  searchField = signal<string>('');
  statusField = signal<string>('');
  orderField = signal<string>('1');
  roleField = signal<string>('');

}
