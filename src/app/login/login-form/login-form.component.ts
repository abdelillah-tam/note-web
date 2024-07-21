import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { SignupComponent } from '../../signup/signup.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class FormComponent {

  constructor(private router: Router,private authService: AuthService, private dialog: MatDialog) { }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  @Output() info: EventEmitter<FormGroup> = new EventEmitter();



  onSubmit() {
    this.authService.login(
      this.loginForm.value.email!.toString(),
      this.loginForm.value.password!.toString(),
    (objectId, email, userToken) => {
      localStorage.setItem('objectId', objectId);
      localStorage.setItem('email', email);
      localStorage.setItem('user-token', userToken);

      this.router.navigate(['/dashboard']);

    });

  }
}
