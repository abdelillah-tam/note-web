import { Component } from '@angular/core';
import { NotesComponent } from './notes/notes.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { SettingsComponent } from './settings/settings.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LeftPanelComponent, NotesComponent, SettingsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  changeToSettings = false;

  changePanel(result: boolean){
    this.changeToSettings = !result;
  }

}
