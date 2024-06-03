import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteService } from '../../services/note/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {

  notes: { noteTitle: string, note: string, date: number }[] = [];

  constructor(private dialog: MatDialog, private noteService: NoteService) {

  }
  ngOnInit(): void {
    let objectId = localStorage.getItem('objectId');
    this.noteService.retrieveNotes(objectId!, (noteTitle, note, date) => {
      this.notes.push({ noteTitle, note, date });
    });
  }


  add() {
    this.dialog.open(AddNoteComponent, {
      height: '400px',
      width: '600px'
    })
  }

}
