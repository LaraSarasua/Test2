import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service'; // asegurate de importar esto

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let n of notes">
        <strong>{{ n.title }}</strong>: {{ n.content }}
        <em *ngIf="n.category">[{{ n.category }}]</em>
        <button (click)="edit.emit(n)">Edit</button>
        <button (click)="deleteNote(n)">Delete</button>
        <button (click)="toggleArchive(n)">
          {{ n.isArchived ? 'Unarchive' : 'Archive' }}
        </button>
      </li>
    </ul>
  `
})
export class NoteListComponent {
  @Input() notes: Note[] = [];
  @Output() edit = new EventEmitter<Note>();
  @Output() changed = new EventEmitter<void>();
  
  constructor(private noteService: NoteService) {}

  deleteNote(note: Note) {
    if (note.id != null) {
      this.noteService.delete(note.id).subscribe(() => {
        this.changed.emit();
      });
    }
  }

  toggleArchive(note: Note) {
    if (note.id != null) {  
      this.noteService.toggleArchive(note).subscribe(() => { 
        this.changed.emit();  // Emite el evento para actualizar la lista de notas
      });
    } else {
      console.error('La nota no tiene un ID válido');
    }
  }
  
}  
