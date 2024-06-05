import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  postNote(noteTitle: string | number, note: string | number, userToken: string) {
    this.http.post('https://merrybirth-us.backendless.app/api/data/notes', {
      noteTitle: noteTitle,
      note: note
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': userToken
      })
    }).subscribe(result => {
      console.log(result);
    });
  }

  retrieveNotes(ownerId: string, fn: (noteTitle: string, note: string, date: number) => any) {
    this.http.get<{
      noteTitle: string;
      note: string;
      created: number
    }[]>(`https://merrybirth-us.backendless.app/api/data/notes?where=ownerId%20%3D%20'${ownerId}'`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).subscribe(result => {
      result.forEach(item => {
        fn(item.noteTitle, item.note, item.created);
      });
      
    });
  }
}
