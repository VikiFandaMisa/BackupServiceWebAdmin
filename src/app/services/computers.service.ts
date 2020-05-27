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

  getComputers(): Observable<ComputerModel[]> { 
    return this.http.get<ComputerModel[]>(
      environment.server + "computers",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  getComputer(id: number): Observable<ComputerModel> { 
    return this.http.get<ComputerModel>(
      environment.server + "computers/" + id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  postComputer(computer: ComputerModel): Observable<ComputerModel> { 
    return this.http.post<ComputerModel>(
      environment.server + "computers",
      computer,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  putComputer(computer: ComputerModel): Observable<ComputerModel> { 
    return this.http.put<ComputerModel>(
      environment.server + "computers/" + computer.id,
      computer,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  deleteComputer(computer: ComputerModel): Observable<ComputerModel> { 
    return this.http.delete<ComputerModel>(
      environment.server + "computers/" + computer.id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }
}
