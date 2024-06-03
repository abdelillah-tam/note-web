import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../../services/note/note.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss'
})
export class AddNoteComponent {

  constructor(private noteService: NoteService) { }

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
    )
  }

}
