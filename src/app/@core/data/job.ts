import { Observable } from "rxjs";

export class Job {
    id: number;
    computerID: number;
    templateID: number;
    active: boolean;
}

export abstract class JobData {
    abstract getJobs(): Observable<Job[]>;
    abstract getJob(id: number): Observable<Job>;
    abstract postJob(job: Job): Observable<Job>;
    abstract putJob(job: Job): Observable<Job>;
    abstract deleteJob(job: Job): Observable<Job>;
}
