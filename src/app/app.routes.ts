import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'upload',
    pathMatch: 'full'
  },
  {
    path: 'upload',
    loadComponent: () => import('./upload/upload.component').then(m => m.UploadComponent),
    title: 'Upload de documents'
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.component').then(m => m.HistoryComponent),
    title: 'Historique des documents'
  },
  {
    path: '**',
    redirectTo: 'upload'
  }
];

export const appRoutingProviders = [
  provideRouter(routes)
];

