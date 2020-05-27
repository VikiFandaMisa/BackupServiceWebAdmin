import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { LogItem } from '../models/logItem';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  
  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  getComputers(): Observable<LogItem[]> { 
    return this.http.get<LogItem[]>(
      environment.server + "log",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  deleteItem(item: LogItem): Observable<LogItem> { 
    return this.http.delete<LogItem>(
      environment.server + "log/" + item.id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }
}
