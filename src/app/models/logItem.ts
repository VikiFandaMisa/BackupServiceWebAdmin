export const MessageType: number[] = [1, 2, 3];

export namespace MessageTypeUtils {
    export function toString(status: number): string {
        switch(status) {
            case 1:
                return "error";
            case 2:
                return "info";
            case 3:
                return "job";
        }
    }
}

export class LogItemModel {
    id: number; 
    jobID: number;
    type: number;
    date: Date;
    message: string; 
}