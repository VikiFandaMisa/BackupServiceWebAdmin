import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
    NbDialogService,
} from "@nebular/theme";
import { Job, JobData } from "../../@core/data/job";
import {
    JobFormComponent,
    ComputerOption,
    TemplateOption,
} from "./job-form/job-form.component";
import { ComputerData } from "../../@core/data/computer";
import { TemplateData } from "../../@core/data/templates";

interface TreeNode {
    data: Job;
}

@Component({
    selector: "jobs",
    templateUrl: "./jobs.component.html",
    styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent {
    defaultColumns = ["computerID", "templateID", "active"];
    allColumns = this.defaultColumns;
    data: TreeNode[];
    computerOptions: ComputerOption[];
    templateOptions: TemplateOption[];
    dataSource: NbTreeGridDataSource<Job>;
    sortColumn: string;
    sortDirection: NbSortDirection = NbSortDirection.NONE;

    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<Job>,
        private jobData: JobData,
        private computerData: ComputerData,
        private templateData: TemplateData,
        private dialogService: NbDialogService
    ) {
        this.loadJobs();
        this.loadOptions();
    }

    loadJobs() {
        this.jobData.getJobs().subscribe((jobs) => {
            this.data = [];
            jobs.forEach((job) => this.data.push({ data: job }));
            this.createDataSource();
        });
    }

    createDataSource() {
        this.dataSource = this.dataSourceBuilder.create(this.data);
    }

    loadOptions() {
        this.computerData.getComputers().subscribe((computers) => {
            this.computerOptions = [];
            computers.forEach((computer) =>
                this.computerOptions.push({
                    id: computer.id,
                    hostname: computer.hostname,
                })
            );
        });
        this.templateData.getTemplates().subscribe((templates) => {
            this.templateOptions = [];
            templates.forEach((template) =>
                this.templateOptions.push({
                    id: template.id,
                    name: template.name,
                })
            );
        });
    }

    updateSort(sortRequest: NbSortRequest): void {
        this.sortColumn = sortRequest.column;
        this.sortDirection = sortRequest.direction;
    }

    getSortDirection(column: string): NbSortDirection {
        if (this.sortColumn === column) {
            return this.sortDirection;
        }
        return NbSortDirection.NONE;
    }

    getShowOn(index: number) {
        const minWithForMultipleColumns = 400;
        const nextColumnStep = 100;
        return minWithForMultipleColumns + nextColumnStep * index;
    }

    click(row: TreeNode) {
        const job: Job = row.data;
        this.dialogService
            .open(JobFormComponent, {
                context: {
                    job: {
                        id: job.id,
                        computerID: job.computerID,
                        templateID: job.templateID,
                        active: job.active,
                    },
                    computers: this.computerOptions,
                    templates: this.templateOptions,
                },
            })
            .onClose.subscribe((job) => {
                if (job != null) {
                    this.data.forEach((data) => {
                        if (data.data.id == job.id) data.data = job;
                    });
                    this.createDataSource();
                }
            });
    }
}
