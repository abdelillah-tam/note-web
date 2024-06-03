import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss'
})
export class LeftPanelComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  @Output() selectedZero: EventEmitter<boolean> = new EventEmitter(true);

  ngOnInit(): void {
    this.selectedZero.subscribe(result => {
      if (result) {
        document.querySelector('.zero')?.classList.add('selected');
        document.querySelector('.one')?.classList.remove('selected');
      } else {
        document.querySelector('.zero')?.classList.remove('selected');
        document.querySelector('.one')?.classList.add('selected');
      }
    });
  }


  change(position: number) {
    if (position === 0) {
      this.selectedZero.emit(true);
    } else {
      this.selectedZero.emit(false);
    }
  }

  logout() {
    let userToken = localStorage.getItem('user-token');
    this.authService.logout(userToken!, () => {
      localStorage.removeItem('user-token');
      localStorage.removeItem('objectId');
      localStorage.removeItem('email');
      this.router.navigate(['/login']);
    });
  }
}
