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
    ReturnAction,
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

    editClick(row: TreeNode) {
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
            .onClose.subscribe((ret) => {
                if (ret != null) {
                    let job = ret[1];
                    if (ret[0] == ReturnAction.delete) this.delete(job);
                    else this.edit(job);
                }
            });
    }

    addClick() {
        this.dialogService
            .open(JobFormComponent, {
                context: {
                    job: {
                        id: null,
                        computerID: null,
                        templateID: null,
                        active: true,
                    },
                    computers: this.computerOptions,
                    templates: this.templateOptions,
                },
            })
            .onClose.subscribe((ret) => {
                if (ret != null) this.add(ret[1]);
            });
    }

    add(job: Job) {
        job.id = 0;
        this.jobData.postJob(job).subscribe((ret) => {
            this.data.push({ data: ret });
            this.createDataSource();
        });
    }

    edit(job: Job) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].data.id == job.id) {
                this.jobData.putJob(job).subscribe((_) => {
                    this.data[i].data = job;
                    this.createDataSource();
                });
                break;
            }
        }
    }

    delete(job: Job) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].data.id == job.id) {
                this.jobData.deleteJob(job).subscribe((_) => {
                    this.data.splice(i, 1);
                    this.createDataSource();
                });
                break;
            }
        }
    }
}
