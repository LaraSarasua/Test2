import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label>Filtrar por categoría:</label>
    <select [ngModel]="selected" (ngModelChange)="onSelectedChange($event)">
      <option value="">Todas</option>
      <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
    </select>
  `
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Input() selected = '';
  @Output() selectedChange = new EventEmitter<string>();

  onSelectedChange(value: string) {
    this.selected = value;
    this.selectedChange.emit(value);
  }
}

