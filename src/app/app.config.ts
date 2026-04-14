import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch as whithFecth, withInterceptors} from '@angular/common/http';
import { authInterceptor } from './services/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideHttpClient(
      whithFecth(), withInterceptors([authInterceptor]))
  ]
};
