import { Component, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }
  ngOnInit(): void {
    let userToken = localStorage.getItem('user-token');
    if (userToken !== null) {
      this.authService.checkIfTokenValid(userToken, (valid) => {
        if (valid) {
          this.route.navigate(['/dashboard']);
        }
      });
    }
  }

}
