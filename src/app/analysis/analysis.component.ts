import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent {
  text: string = '';
  entities: any[] = [];
  keywords: string[] = [];
  question: string = '';
  answer: string = '';
  wordcloud: string = ''; // base64 image
  loading = false;

  constructor(private api: ApiService) {}

  analyzeText() {
    if (!this.text.trim()) return;
    this.loading = true;
    this.api.extractEntities(this.text).subscribe({
      next: (res) => {
        this.entities = res.entities;
        this.keywords = res.keywords;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  askQuestion() {
    if (!this.text || !this.question.trim()) return;
    this.loading = true;
    this.api.askQuestion(this.text, this.question).subscribe({
      next: (res) => {
        this.answer = res.answer;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

generateWordCloud() {
  if (!this.text.trim()) return;
  this.api.generateWordCloud(this.text).subscribe({
    next: (res) => {
      this.wordcloud = 'data:image/png;base64,' + res.wordcloud_base64;
    },
    error: (err) => console.error(err)
  });
}

/* 1. Ajoute ces variables */
selectedFile: File | null = null;
uploadText = '';   // texte extrait du fichier

/* 2. Méthode déclenchée par (change)="onFileSelected($event)" */
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    this.selectedFile = input.files[0];
  }
}

/* 3. Upload + analyse */
uploadAndAnalyse() {
  if (!this.selectedFile) return;
  this.loading = true;

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.api.uploadFile(formData).subscribe({
    next: res => {
      this.uploadText = res.text;     // texte brut extrait
      this.text = res.text;           // on le met aussi dans la zone de texte
      this.analyzeText();             // lance l’analyse existante
      this.loading = false;
    },
    error: err => {
      console.error(err);
      this.loading = false;
    }
  });
}

}
