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

  getAccounts(): Observable<AccountModel[]> { 
    return this.http.get<AccountModel[]>(
      environment.server + "accounts",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  getSelf(): Observable<AccountModel> {
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

  postAccount(account: AccountModel): Observable<AccountModel> { 
    return this.http.post<AccountModel>(
      environment.server + "accounts",
      account,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }
  
  putAccount(account: AccountModel): Observable<AccountModel> { 
    return this.http.put<AccountModel>(
      environment.server + "accounts",
      account,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  deleteAccount(account: AccountModel): Observable<AccountModel> { 
    return this.http.delete<AccountModel>(
      environment.server + "accounts/" + account.id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }
}
