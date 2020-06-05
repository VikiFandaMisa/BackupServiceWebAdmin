import { Path } from "./path";
import { Observable } from "rxjs";

export const BackupType: number[] = [1, 2, 3];
export const BackupFileType: number[] = [1, 2];

export namespace BackupFileTypeUtils {
    export function toString(status: number): string {
        switch (status) {
            case 1:
                return "plain";
            case 2:
                return "zip";
        }
    }
}
export namespace BackupTypeUtils {
    export function toString(status: number): string {
        switch (status) {
            case 1:
                return "full";
            case 2:
                return "differential";
            case 3:
                return "incremental";
        }
    }
}
export class Template {
    id: number;
    name: string;
    period: string;
    type: number;
    targetFileType: number;
    start: Date;
    end: Date;
    paused: boolean;
    retention: number;
    sources: Path[];
    targets: Path[];
}

export abstract class TemplateData {
    abstract getTemplates(): Observable<Template[]>;
    abstract getTemplate(id: number): Observable<Template>;
    abstract postTemplate(template: Template): Observable<Template>;
    abstract putTemplate(template: Template): Observable<Template>;
    abstract deleteTemplate(template: Template): Observable<Template>;
}
