import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AccountModel } from '../models/account';

//AccountsService
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  username: string;
  password: string;

  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  fetchAccounts() { 
    return this.http.get<AccountModel[]>(
      "https://localhost:5001/api/accounts",
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.auth.token
        }
        )
      }
    )
  }


  
}
