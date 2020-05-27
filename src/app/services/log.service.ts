import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { LogItemModel } from '../models/logItem';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  
  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  getLog(): Observable<LogItemModel[]> { 
    return this.http.get<LogItemModel[]>(
      environment.server + "log",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  getLogItem(id: number): Observable<LogItemModel> { 
    return this.http.get<LogItemModel>(
      environment.server + "log/" + id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  deleteItem(item: LogItemModel): Observable<LogItemModel> { 
    return this.http.delete<LogItemModel>(
      environment.server + "log/" + item.id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }
}
