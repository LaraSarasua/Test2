import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule)
  ]
};
