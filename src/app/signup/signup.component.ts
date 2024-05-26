import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupEv = new FormGroup({});


  addToSignup(signupForm: FormGroup){
    this.signupEv = signupForm;

    console.log(this.signupEv.value);
  }
}
