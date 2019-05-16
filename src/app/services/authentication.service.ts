import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private storage: Storage,
    ) { }

    private baseUrl = 'http://localhost:3000/';

    async login(data) {
      const login: any = await this.http.post(this.baseUrl + 'auth/login', data ,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      ).toPromise();
      this.storage.set('role', login.role.role);
      this.storage.set('roleId', login.role.id);
      this.storage.set('userId', login.userId);
      this.storage.set('authToken', login.token);
      console.log('test');
      if (login.role.role === 'client') {
        console.log('it\'s a client');
        this.router.navigate(['client/dashboard']);
      } else {
        console.log('it\'s not a client');
        this.router.navigate(['psy/schedule']);
      }
    }
    async register(user, contact) {
      console.log(contact);
      const signUp: any = await this.http.put(this.baseUrl + 'auth/signup',
      user,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      ).toPromise();

      const firstLogin: any = await this.http.post(this.baseUrl + 'auth/login',
      user,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      ).toPromise();
      console.log(signUp);
      console.log(firstLogin);

      

      if(!firstLogin.token) {
        //throw an error

      }

      const profile: any = await this.http.post(this.baseUrl + 'client/profile', contact,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + firstLogin.token
        }
      }).toPromise();
      if (!profile) {
        //throw an error

      }
      console.log(profile);
      const login: any = await this.http.post(this.baseUrl + 'auth/login',
      {
        email: user.email,
        password: user.password
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      ).toPromise();
      console.log(login);
      this.storage.set('role', login.role.role);
      this.storage.set('roleId', login.role.id);
      this.storage.set('userId', login.userId);
      this.storage.set('authToken', login.token);
      this.router.navigate(['client/dashboard']);
    }
}

