import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  processFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/process`, formData);
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }

    // ---- 🔹 Nouveau : Analyse d’entités nommées ----
  extractEntities(text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/extract_entities`, { text });
  }

  // ---- 🔹 Nouveau : Q&A (Question Answering) ----
  askQuestion(text: string, question: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/qa`, { text, question });
  }

  // ---- 🔹 Nouveau : Génération WordCloud ----
  generateWordCloud(text: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/wordcloud`, { text });
  }

  // ---- 🔹 (Optionnel) Sauvegarde d’analyse ----
  saveAnalysis(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save_analysis`, data);
  }

  getAnalysisHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/analysis_history`);
  }
  uploadFile(formData: FormData): Observable<{ text: string }> {
  return this.http.post<{ text: string }>(`${this.baseUrl}/upload`, formData);
}

}
