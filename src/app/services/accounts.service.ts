import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AccountModel } from '../models/account';

import { environment } from 'src/environments/environment';

//AccountsService
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  username: string;
  password: string;

  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  fetchAccounts() { 
    console.log(this.auth.token);
    return this.http.get<AccountModel[]>(
      environment.server + "accounts",
      {
        headers: new HttpHeaders({
          //'Authorization': 'Bearer '
          'Authorization': this.auth.token
        })
      }
    )
  }


  
}
