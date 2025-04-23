import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private base = '/api/notes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.base);
  }

  create(n: Note): Observable<Note> {
    return this.http.post<Note>(this.base, n);
  }

  update(id: number, n: Note): Observable<Note> {
    return this.http.put<Note>(`${this.base}/${id}`, n);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  toggleArchive(note: Note): Observable<Note> {
    if (note.id != null) {
      const updated = { ...note, isArchived: !note.isArchived };  // Cambiar el estado de isArchived
      return this.http.patch<Note>(`${this.base}/${note.id}/archive`, updated);  // Hacer PATCH para actualizar solo el estado isArchived
    }
    throw new Error('La nota no tiene un ID válido');
  }
  
}

