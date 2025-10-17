import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ImageBotService, GenerateImageRequest, GenerateImageResponse } from '../../core/services/image-bot.service';

@Component({
  selector: 'app-image-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],   // <-- important pour *ngIf / ngModel
  templateUrl: './image-bot.component.html',
  styleUrls: ['./image-bot.component.css']
})
export class ImageBotComponent {
  prompt = '';
  enhance = true;
  width = 768;
  height = 768;

  loading = false;
  error: string | null = null;

  resultImg: string | null = null;
  usedPrompt: string | null = null;

  constructor(private svc: ImageBotService) {}

  generate() {
    this.error = null;
    this.resultImg = null;
    this.usedPrompt = null;
    const body: GenerateImageRequest = {
      prompt: this.prompt,
      width: this.width,
      height: this.height,
      enhance: this.enhance
    };
    this.loading = true;
    this.svc.generateImage(body).pipe(finalize(() => (this.loading = false))).subscribe({
      next: (res: GenerateImageResponse) => {
        this.resultImg = res.image_base64;
        this.usedPrompt = res.used_prompt;
      },
      error: (err) => {
        this.error = err?.error?.error ?? 'Erreur lors de la génération.';
      }
    });
  }
}
