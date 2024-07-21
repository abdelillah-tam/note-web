import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class FormComponent {

  constructor(private authService: AuthService) {

  }

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repass: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  @Output() info: EventEmitter<FormGroup> = new EventEmitter();

  onSubmit() {
    let result = this.authService
      .signup(
        this.signupForm.value.username!.toString(),
        this.signupForm.value.password!.toString()
      );

     
  }


}
