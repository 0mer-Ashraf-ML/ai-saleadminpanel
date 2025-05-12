import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class LatestChatService {
  private commonSrv = inject(CommonService);
  private ai = '';

  constructor(private http: HttpClient) {
    this.ai = this.commonSrv.config.Ai;
  }

  getLatestChat(): Observable<any> {
    return this.http.get<any>(
      `${this.ai}/user/${this.commonSrv.getUser()?.id}/latest-conversation`
    );
  }
}
