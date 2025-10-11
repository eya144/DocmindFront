import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile!: File;
  summary: string = '';
  audioUrl: string = '';
  loading: boolean = false;


  constructor(private api: ApiService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  async process() {
    if (!this.selectedFile) return;
    this.loading = true;
    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
     
      
      const res = await this.api.processFile(formData).toPromise();
      this.summary = res.summary;
      this.audioUrl = `http://localhost:5000${res.audio_url}`;
    } catch (err) {
      console.error(err);
      alert('Erreur lors du traitement du fichier');
    } finally {
      this.loading = false;
    }
  }
}
