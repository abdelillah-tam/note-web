import { Component, OnInit } from '@angular/core';
import { FormComponent } from './form/form.component';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    let userToken = localStorage.getItem('user-token');
    let objectId = localStorage.getItem('objectId');
    let email = localStorage.getItem('email');

    if(userToken !== null && objectId !== null && email !== null){
      this.authService.checkIfTokenValid(userToken, (valid) => {
        if(valid){
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  signupEv = new FormGroup({});


  addToSignup(signupForm: FormGroup) {
    this.signupEv = signupForm;

    console.log(this.signupEv.value);
  }
}
