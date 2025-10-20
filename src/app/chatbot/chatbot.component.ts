import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type RagSource = { tag: string; citation: string; preview: string };

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  selectedFile!: File;
  text = '';
  summary = '';
  audioUrl = '';
  entities: any[] = [];
  keywords: string[] = [];
  wordcloud = '';
  question = '';
  answer = '';
  sources: RagSource[] = [];  // <-- citations RAG
  loading = false;

  constructor(private readonly api: ApiService) {}

  // --- Upload & Extraction du texte ---
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadAndProcess() {
    if (!this.selectedFile) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.api.uploadFile(formData).subscribe({
      next: (res) => {
        this.text = res.text;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors du téléchargement du fichier');
        this.loading = false;
      }
    });
  }

  // --- Résumé + Audio ---
  generateSummary() {
    if (!this.text.trim()) return;
    this.loading = true;
    // On transforme le texte en "fichier" pour réutiliser /process
    const formData = this.createFormDataFromText(this.text);
    this.api.processFile(formData).subscribe({
      next: (res) => {
        this.summary = res.summary;
        this.audioUrl = `http://localhost:5000${res.audio_url}`;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  private createFormDataFromText(text: string): FormData {
    const blob = new Blob([text], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob, 'text.txt');
    return formData;
  }

  // --- Entités & mots-clés ---
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

  // --- WordCloud ---
  generateWordCloud() {
    if (!this.text.trim()) return;
    this.api.generateWordCloud(this.text).subscribe({
      next: (res) => {
        this.wordcloud = 'data:image/png;base64,' + res.wordcloud_base64;
      },
      error: (err) => console.error(err)
    });
  }

  // --- Q&A "classique" (utilise /qa → backend choisit RAG si libs ok) ---
  askQuestion() {
    if (!this.text.trim() || !this.question.trim()) return;
    this.loading = true;
    this.sources = [];
    this.answer = '';

    this.api.askQuestion(this.text, this.question).subscribe({
      next: (res) => {
        this.answer = res.answer;
        this.sources = res.sources || []; // si backend RAG actif
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // --- Chat RAG (même /qa, avec texte) ---
  // On garde un bouton séparé pour l'UX, mais c'est le même appel que askQuestion
  askRAG() {
    if (!this.text.trim()) {
      alert('Veuillez fournir un texte (ou importer un fichier) pour le RAG.');
      return;
    }
    if (!this.question.trim()) return;

    this.loading = true;
    this.sources = [];
    this.answer = '';

    // Même endpoint /qa : le backend applique Chunking + FAISS + Top-K + Citations si dispo
    this.api.askQuestion(this.text, this.question).subscribe({
      next: (res) => {
        this.answer = res.answer;
        this.sources = res.sources || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
