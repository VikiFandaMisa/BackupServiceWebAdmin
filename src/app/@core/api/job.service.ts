import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { JobData, Job } from "../data/job";

@Injectable()
export class JobService extends JobData {
    constructor(private httpClient: HttpClient) {
        super();
    }

    getJobs(): Observable<Job[]> {
        return this.httpClient.get<Job[]>("/api/jobs");
    }

    getJob(id: number): Observable<Job> {
        return this.httpClient.get<Job>("/api/jobs/" + id);
    }

    postJob(job: Job): Observable<Job> {
        return this.httpClient.post<Job>("/api/jobs/", job);
    }

    putJob(job: Job): Observable<Job> {
        return this.httpClient.put<Job>("/api/jobs/", job);
    }

    deleteJob(job: Job): Observable<Job> {
        return this.httpClient.delete<Job>("/api/jobs/" + job.id);
    }
}
