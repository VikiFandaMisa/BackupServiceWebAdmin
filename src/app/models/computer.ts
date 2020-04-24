export const ComputerStatus: number[] = [1, 2, 3];

export namespace ComputerStatusUtils {
    export function toString(status: number): string {
        switch(status) {
            case 1:
                return "pending";
            case 2:
                return "approved";
            case 3:
                return "denied"
        }
    }
}

export class ComputerModel {
    id: number;
    hostname: string;    
    lastSeen: Date;
    ip: string;
    mac: string;
    status: number;
}