import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonService } from '../modules/layout/services/common.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const commonSrv = inject(CommonService);
  const token = commonSrv.getToken()!;
  if (token) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(clonedReq);
  }

  return next(req);
};
