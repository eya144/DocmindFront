import { Routes , provideRouter} from '@angular/router';


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
    path: 'chatbot',
    loadComponent: () => import('./chatbot/chatbot.component').then(m => m.ChatbotComponent),
    title: 'chatbot'
  },
    {
    path: 'image-bot',
    loadComponent: () =>
      import('./features/image-bot/image-bot.component')
        .then(m => m.ImageBotComponent)
  },
  {
    path: '**',
    redirectTo: 'upload'
  }
];

export const appRoutingProviders = [
  provideRouter(routes)
];

