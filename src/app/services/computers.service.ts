import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { ComputerModel } from '../models/computer';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {
  
  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  fetchComputers(): Observable<ComputerModel[]> { 
    return this.http.get<ComputerModel[]>(
      environment.server + "computers",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }
}
