import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { prospects } from '../models/prospects.interface';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ProspectsService {
  private commonSrv = inject(CommonService);
  private api = '';

  constructor(private http: HttpClient) {
    this.api = this.commonSrv.config.Api;
  }

  uploadProspects(data: prospects[]): Observable<any> {
    return this.http.post<any>(`${this.api}/prospects`, data);
  }

  getProspects(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/prospects?companyId=${id}`);
  }

  updateProspects(id: any, data: prospects): Observable<any> {
    return this.http.put<any>(`${this.api}/prospects/${id}`, data);
  }

  deleteProspects(id: any): Observable<any> {
    return this.http.delete<any>(`${this.api}/prospects/${id}`);
  }
}
