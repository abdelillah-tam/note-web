import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){
    

    
  }
  ngOnInit(): void {
    let userToken = localStorage.getItem('user-token');
    let objectId = localStorage.getItem('objectId');
    let email = localStorage.getItem('email');

    if(userToken === null || objectId === null || email === null){
      this.router.navigate(['/login']);
    }else{
      this.authService.checkIfTokenValid(userToken, (valid) =>{
        if(!valid){
          this.router.navigate(['/login']);
        }
      })
    }
  }

  changeToSettings = false;

  changePanel(result: boolean){
    this.changeToSettings = !result;
  }

}
