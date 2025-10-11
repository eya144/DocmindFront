import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutingProviders } from './app.routes';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    ...appRoutingProviders,
    importProvidersFrom(BrowserModule),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    )
  ]
};
