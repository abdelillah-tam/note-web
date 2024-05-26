import { Component } from '@angular/core';
import { NotesComponent } from './notes/notes.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LeftPanelComponent, NotesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
