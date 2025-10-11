import { Injectable } from '@angular/core';

type Severity = 'success' | 'info' | 'warn' | 'error';

export interface NotificationOptions {
  sticky?: boolean;
  key?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {}

  private log(severity: Severity, message: string, title: string = '') {
    const prefix = title ? `[${title}] ` : '';
    const fullMessage = `${prefix}${message}`;
    
    switch (severity) {
      case 'error':
        console.error(fullMessage);
        break;
      case 'warn':
        console.warn(fullMessage);
        break;
      case 'info':
        console.info(fullMessage);
        break;
      case 'success':
      default:
        console.log(fullMessage);
    }
  }

  success(message: string, title: string = 'Succès', options?: NotificationOptions) {
    this.log('success', message, title);
  }

  info(message: string, title: string = 'Information', options?: NotificationOptions) {
    this.log('info', message, title);
  }

  warn(message: string, title: string = 'Attention', options?: NotificationOptions) {
    this.log('warn', message, title);
  }

  error(message: string, title: string = 'Erreur', options?: NotificationOptions) {
    this.log('error', message, title);
  }

  clear(key?: string) {
    console.clear();
  }
}
