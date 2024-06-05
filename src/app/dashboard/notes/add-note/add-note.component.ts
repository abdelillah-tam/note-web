import { Component, EventEmitter, Inject, Injector, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../../services/note/note.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss'
})
export class AddNoteComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { fu: () => undefined }, private noteService: NoteService) { }

  @Output() added = new EventEmitter();

  noteForm = new FormGroup({
    noteTitle: new FormControl('', [Validators.nullValidator]),
    note: new FormControl('', [Validators.nullValidator])
  });

  addNote() {
    let userToken = localStorage.getItem('user-token');
    this.noteService.postNote(
      this.noteForm.value.noteTitle!,
      this.noteForm.value.note!,
      userToken!
    );
    this.noteForm.controls.noteTitle.setValue('');
    this.noteForm.controls.note.setValue('');
    this.data.fu();
  }

}
