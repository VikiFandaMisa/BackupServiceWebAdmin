import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ComputerData, Computer } from "../data/computer";

@Injectable()
export class ComputerService extends ComputerData {
    constructor(private httpClient: HttpClient) {
        super();
    }

    getComputers(): Observable<Computer[]> {
        return this.httpClient.get<Computer[]>("/api/computers");
    }

    getComputer(id: number): Observable<Computer> {
        return this.httpClient.get<Computer>("/api/computers/" + id);
    }

    postComputer(computer: Computer): Observable<Computer> {
        return this.httpClient.post<Computer>("/api/computers/", computer);
    }

    putComputer(computer: Computer): Observable<Computer> {
        return this.httpClient.put<Computer>(
            "/api/computers/" + computer.id,
            computer
        );
    }

    deleteComputer(computer: Computer): Observable<Computer> {
        return this.httpClient.delete<Computer>(
            "/api/computers/" + computer.id
        );
    }
}
