import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';

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
    path: 'analysis',
    loadComponent: () => import('./analysis/analysis.component').then(m => m.AnalysisComponent),
    title: 'Analyse des documents'
  },
  {
    path: '**',
    redirectTo: 'upload'
  }
];

export const appRoutingProviders = [
  provideRouter(routes)
];

