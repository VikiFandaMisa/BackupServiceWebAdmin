import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { AccountModel } from '../models/account';

//AccountsService
@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  self: AccountModel;

  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  fetchAccounts(): Observable<AccountModel[]> { 
    return this.http.get<AccountModel[]>(
      environment.server + "accounts",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  fetchSelf(): Observable<AccountModel> {
    return this.http.get<AccountModel>(
      environment.server + "accounts/self",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    ).pipe(
      map(acc => {
        this.self = acc;
        return acc;
      })
    )
  }
}
