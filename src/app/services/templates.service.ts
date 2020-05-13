import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { TemplateModel } from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  
  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  getTemplates(): Observable<TemplateModel[]> { 
    return this.http.get<TemplateModel[]>(
      environment.server + "templates",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  postTemplate(template: TemplateModel): Observable<TemplateModel> { 
    return this.http.post<TemplateModel>(
      environment.server + "templates",
      template,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  putTemplate(template: TemplateModel): Observable<TemplateModel> { 
    return this.http.put<TemplateModel>(
      environment.server + "templates",
      template,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  deleteTemplate(template: TemplateModel): Observable<TemplateModel> { 
    return this.http.delete<TemplateModel>(
      environment.server + "templates/" + template.id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }
}
