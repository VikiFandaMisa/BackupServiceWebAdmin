import { Observable } from "rxjs";

export const ComputerStatus: number[] = [1, 2, 3];

export namespace ComputerStatusUtils {
    export function toString(status: number): string {
        switch (status) {
            case 1:
                return "pending";
            case 2:
                return "approved";
            case 3:
                return "denied";
        }
    }
}

export interface Computer {
    id: number;
    hostname: string;
    lastSeen: Date;
    ip: string;
    mac: string;
    status: number;
}

export abstract class ComputerData {
    abstract getComputers(): Observable<Computer[]>;
    abstract getComputer(id: number): Observable<Computer>;
    abstract postComputer(computer: Computer): Observable<Computer>;
    abstract putComputer(computer: Computer): Observable<Computer>;
    abstract deleteComputer(computer: Computer): Observable<Computer>;
}
