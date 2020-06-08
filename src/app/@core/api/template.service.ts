import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TemplateData, Template } from "../data/templates";

@Injectable()
export class TemplateService extends TemplateData {
    constructor(private httpClient: HttpClient) {
        super();
    }

    getTemplates(): Observable<Template[]> {
        return this.httpClient.get<Template[]>("/api/templates");
    }

    getTemplate(id: number): Observable<Template> {
        return this.httpClient.get<Template>("/api/templates/" + id);
    }

    postTemplate(template: Template): Observable<Template> {
        return this.httpClient.post<Template>("/api/templates/", template);
    }

    putTemplate(template: Template): Observable<Template> {
        return this.httpClient.put<Template>("/api/templates/", template);
    }

    deleteTemplate(template: Template): Observable<Template> {
        return this.httpClient.delete<Template>(
            "/api/templates/" + template.id
        );
    }
}
