import { Observable } from "rxjs";

export const MessageType: number[] = [1, 2, 3];

export namespace MessageTypeUtils {
    export function toString(status: number): string {
        switch (status) {
            case 1:
                return "error";
            case 2:
                return "info";
            case 3:
                return "job";
        }
    }
}

export interface LogItem {
    id: number;
    jobID: number;
    type: number;
    date: string;
    message: string;
}

export abstract class LogItemData {
    abstract getLogItems(): Observable<LogItem[]>;
    abstract getLogItem(id: number): Observable<LogItem>;
    abstract deleteLogItem(logItem: LogItem): Observable<LogItem>;
}
