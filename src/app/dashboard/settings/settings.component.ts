import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  objectId = localStorage.getItem('objectId');
  userToken = localStorage.getItem('user-token');

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.getUserData();
  }

  settingsForm = new FormGroup({
    email: new FormControl('', [Validators.nullValidator, Validators.email]),
    password: new FormControl('', [Validators.minLength(8), Validators.required])
  });

  update() {

    if (this.settingsForm.controls.password.valid) {

      this.authService.updateEmail(this.settingsForm.value.email!,
        this.settingsForm.value.password!,
        this.objectId!,
        this.userToken!);
    } else {
      this.authService.updateEmail(this.settingsForm.value.email!, null, this.objectId!, this.userToken!);
    }
  }

  private getUserData() {
    this.authService.getUserData(email => {
      this.settingsForm.controls.email.setValue(email);
    }, this.objectId!, this.userToken!);
  }
}
