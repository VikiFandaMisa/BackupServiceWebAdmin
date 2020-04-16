import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccountModel } from '../models/account';
import { TokenModel } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  account: AccountModel;

  constructor(private http: HttpClient) { }

  authenticate = async (username: string, password: string) => {
    await this.http.post<TokenModel>(
      "https://localhost:5001/api/token",
      {
        "Username": username,
        "Password": password
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    )
    .toPromise()
    .then(
      async token => {
        this.token = token.token;
        await this.loadSelf();
      },
      error => { throw error }
    );
  }

  private loadSelf = async () => {
    await this.http.get<AccountModel>(
      "https://localhost:5001/api/accounts/self",
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        })
      }
    )
    .toPromise()
    .then(account => this.account = account, error => { throw error });
  }
  
}