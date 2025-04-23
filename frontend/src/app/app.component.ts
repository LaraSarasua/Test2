import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';             
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { NoteService } from './services/note.service';
import { Note } from './models/note.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [                                     
    CommonModule,
    FormsModule,                                  
    NoteFormComponent,
    NoteListComponent,
    CategoryFilterComponent
  ],
  template: `
    <h1> My Notes </h1>

    <app-category-filter
      [categories]="categories"
      [(selected)]="selectedCategory">
    </app-category-filter>

    <button (click)="showArchived=false">Actives</button>
    <button (click)="showArchived=true">Archived</button>

    <app-note-form
      [note]="editingNote"
      (saved)="reload()">
    </app-note-form>

    <app-note-list
      [notes]="filteredNotes()"
      (edit)="startEdit($event)"
      (changed)="reload()">
    </app-note-list>
  `
})
export class AppComponent {
  notes: Note[] = [];
  categories: string[] = [];         
  selectedCategory = '';            
  showArchived = false;
  editingNote: Note = { title: '', content: '', isArchived: false };

  constructor(private svc: NoteService) {
    this.reload();
  }

  reload() {
    this.svc.getAll().subscribe(list => {
      this.notes = list;
      const cats = list
        .map(n => n.category)
        .filter((c): c is string => c !== undefined);
  
      this.categories = Array.from(new Set(cats));
      this.editingNote = { title: '', content: '', isArchived: false };
    });
  }

  filteredNotes(): Note[] {
    return this.notes
      .filter(n => n.isArchived === this.showArchived)
      .filter(n =>
        !this.selectedCategory || n.category === this.selectedCategory
      );
  }

  startEdit(n: Note) {
    this.editingNote = { ...n };
  }
}
