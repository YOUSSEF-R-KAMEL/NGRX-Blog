import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppState } from './store/AppState';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideEffects } from '@ngrx/effects';
import { BlogEffects } from './store/effects/blog.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { AppEffect } from './store/effects/App.effect';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideRouterStore } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/customSerializer';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(AppState),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([BlogEffects, AppEffect]),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(NgxSpinnerModule),
    provideToastr({
        timeOut: 4000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true
    }),
    providePrimeNG({
      theme: {
          preset: Aura
      }
  }),
    provideRouterStore({serializer: CustomSerializer})
],
};
