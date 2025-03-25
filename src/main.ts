import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     provideHttpClient(),
//     CookieService,
//   ],
// }).catch((err) => console.error(err));
