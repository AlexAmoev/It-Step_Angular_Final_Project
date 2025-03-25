import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const pageBlockGuard: CanActivateFn = (route, state) => {
  const getUserToken = inject(CookieService);

  if (getUserToken.get('token')) {
    return true;
  } else {
    return false;
  }
};
