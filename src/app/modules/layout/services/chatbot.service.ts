import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private commonSrv = inject(CommonService);
  private ai = '';
  private api = '';

  constructor(private http: HttpClient) {
    this.ai = this.commonSrv.config.Ai + '/chat';
    this.api = this.commonSrv.config.Api;
  }

  conservation(params: any): Observable<any> {
    return this.http.post<any>(this.ai, null , { params });
  }

  uploadProspects(data: any):Observable<any> {
    return this.http.post<any>(`${this.api}/propects/upload`, data);
  }

  getProspects(data: any):Observable<any> {
    return this.http.get<any>(`${this.api}/propects/getprospects`, data);
  }
}
