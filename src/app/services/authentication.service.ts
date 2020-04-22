import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccountModel } from '../models/account';
import { TokenModel } from '../models/token';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;

  get authorizationHeader(): string {
    return 'Bearer ' + this.token;
  }

  constructor(private http: HttpClient) { }
  
  loadToken() {
    this.token = sessionStorage.getItem('token');
  }

  saveToken() {
    sessionStorage.setItem('token', this.token);
  }

  authenticate(username: string, password: string): Observable<TokenModel> {
    console.log("creating request " + username + ":" + password);
    return this.http.post<TokenModel>(
      environment.server + 'token/user',
      {
        'Username': username,
        'Password': password
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      map(token => {
        this.token = token.token;
        this.saveToken();
        console.log("saving " + this.token);
        console.log("saving " + token.token);
        return token;
      })
    )
  }
}