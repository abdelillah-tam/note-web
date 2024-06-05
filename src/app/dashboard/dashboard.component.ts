import { Component } from '@angular/core';
import { NotesComponent } from './notes/notes.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { SettingsComponent } from './settings/settings.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LeftPanelComponent, NotesComponent, SettingsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router){
    let userToken = localStorage.getItem('user-token');
    let objectId = localStorage.getItem('objectId');
    let email = localStorage.getItem('email');

    if(userToken === null || objectId === null || email === null){
      router.navigate(['/login']);
    }else{
      authService.checkIfTokenValid(userToken, (valid) =>{
        if(!valid){
          router.navigate(['/login']);
        }
      })
    }

    
  }

  changeToSettings = false;

  changePanel(result: boolean){
    this.changeToSettings = !result;
  }

}
