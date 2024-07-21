import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    this.http
      .post<{ email: string }>('https://brainyclub-eu.backendless.app/api/users/register', {
        'email': email,
        'password': password
      }, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .subscribe(response => {
        if (response.email.length > 0) {
          this.router.navigate(['/login']);
        }
      });
  }

  login(email: string,
    password: string,
    callWhenLoggedIn: (objectId: string, email: string, userToken: string) => any) {
    this
      .http
      .post<{
        objectId: string;
        email: string;
        'user-token': string
      }>('https://brainyclub-eu.backendless.app/api/users/login', {
        'login': email,
        'password': password
      }, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(response => {
        callWhenLoggedIn(response.objectId, response.email, response['user-token']);
      });
  }

  logout(userToken: string, afterLogout: () => undefined) {
    this.http.get('https://brainyclub-eu.backendless.app/api/users/logout', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': userToken
      })
    }).subscribe(result => {
      afterLogout();
    });
  }

  checkIfTokenValid(userToken: string, afterResult: (valid: boolean) => undefined) {
    this.http.get<boolean>(`https://brainyclub-eu.backendless.app/api/users/isvalidusertoken/${userToken}`)
      .subscribe(result => {
        afterResult(result);
      });
  }

  getUserData(fn: (email: string) => any, objectId: string, userToken: string) {
    this.http.get<{ email: string }>(`https://brainyclub-eu.backendless.app/api/data/Users/${objectId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': userToken
      })
    }).subscribe(result => {
      fn(result.email);
    });
  }



  updateEmail(email: string, password: string | null, objectId: string, userToken: string) {
    if (password !== null) {
      this.http.put(`https://brainyclub-eu.backendless.app/api/data/Users/${objectId}`, {
        'email': email,
        'password': password!
      },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'user-token': userToken
          })
        }).subscribe(result => {
        });
    } else {
      this.http.put('https://brainyclub-eu.backendless.app/api/data/Users/22A6D4B8-DA9F-40E3-832A-2EFBE0CB4AC5', {
        'email': email
      },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'user-token': userToken
          })
        }).subscribe(result => {
          console.log(result);
        });
    }
  }

}
