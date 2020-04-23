export enum ComputerStatus {
    pending = 1,
    approved = 2,
    denied = 3
}

export namespace ComputerStatus {
    export function toString(status: ComputerStatus): string {
        return ComputerStatus[status];
    }
}

export class ComputerModel {
    id: number;
    hostname: string;    
    lastSeen: Date;
    ip: string;
    mac: string;
    status: ComputerStatus;
}