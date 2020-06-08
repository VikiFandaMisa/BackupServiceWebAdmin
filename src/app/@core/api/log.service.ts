import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { LogItemData, LogItem } from "../data/logItem";

@Injectable()
export class LogService extends LogItemData {
    constructor(private httpClient: HttpClient) {
        super();
    }

    getLogItems(): Observable<LogItem[]> {
        return this.httpClient.get<LogItem[]>("/api/log");
    }

    getLogItem(id: number): Observable<LogItem> {
        return this.httpClient.get<LogItem>("/api/log/" + id);
    }

    deleteLogItem(logItem: LogItem): Observable<LogItem> {
        return this.httpClient.delete<LogItem>("/api/log/" + logItem.id);
    }
}
