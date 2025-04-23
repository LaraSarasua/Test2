import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <form (ngSubmit)="save()">
      <input [(ngModel)]="note.title" name="title" placeholder="Title" required />
      <textarea [(ngModel)]="note.content" name="content" placeholder="Content" required></textarea>
      <input [(ngModel)]="note.category" name="category" placeholder="Category (optional)" />
      <button type="submit">{{ note.id ? 'Update' : 'Create' }}</button>
    </form>
  `
})
export class NoteFormComponent {
  @Input() note: Note = { title: '', content: '', isArchived: false };
  @Output() saved = new EventEmitter<void>();

  constructor(private svc: NoteService) {}

  save() {
    const op = this.note.id
      ? this.svc.update(this.note.id, this.note)
      : this.svc.create(this.note);
    op.subscribe(() => {
      this.saved.emit();
      this.note = { title: '', content: '', isArchived: false };
    });
  }
}
