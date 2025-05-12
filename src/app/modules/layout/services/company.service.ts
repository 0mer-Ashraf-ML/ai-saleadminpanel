import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { company } from 'src/app/models/companies.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private commonSrv = inject(CommonService);
    private api = '';
  
    constructor(private http: HttpClient) {
      this.api = this.commonSrv.config.Api;
    }

  postCompany(data: company): Observable<any> {
    return this.http.post<any>(`${this.api}/companies`, data);
  }

  getCompanies(): Observable<any> {
    return this.http.get<any>(`${this.api}/companies`);
  }

  updateCompany(id: any, data: company): Observable<any> {
    return this.http.put<any>(`${this.api}/companies/${id}`, data);
  }

  deleteCompany(id: any): Observable<any> {
    return this.http.delete<any>(`${this.api}/companies/${id}`);
  }
}
