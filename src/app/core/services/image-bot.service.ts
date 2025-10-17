import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface GenerateImageRequest {
  prompt: string;
  width?: number;
  height?: number;
  enhance?: boolean;
}

export interface GenerateImageResponse {
  image_base64: string;
  used_prompt: string;
}

@Injectable({ providedIn: 'root' })
export class ImageBotService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  generateImage(body: GenerateImageRequest) {
    return this.http.post<GenerateImageResponse>(`${this.baseUrl}/generate-image`, body);
    // Tu peux aussi ajouter des méthodes /api/chat plus tard si besoin.
  }
}
