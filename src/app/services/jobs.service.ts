import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { JobModel } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  
  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  getJobs(): Observable<JobModel[]> { 
    return this.http.get<JobModel[]>(
      environment.server + "jobs",
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  getJob(id: number): Observable<JobModel> { 
    return this.http.get<JobModel>(
      environment.server + "jobs/" + id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  postJob(job: JobModel): Observable<JobModel> { 
    return this.http.post<JobModel>(
      environment.server + "jobs",
      job,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  putJob(job: JobModel): Observable<JobModel> { 
    return this.http.put<JobModel>(
      environment.server + "jobs/" + job.id,
      job,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }

  deleteJob(job: JobModel): Observable<JobModel> { 
    return this.http.delete<JobModel>(
      environment.server + "jobs/" + job.id,
      {
        headers: new HttpHeaders({
          'Authorization': this.auth.authorizationHeader
        })
      }
    )
  }
}
