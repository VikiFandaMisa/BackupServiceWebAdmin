import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
    NbDialogService,
} from "@nebular/theme";
import { Job, JobData } from "../../@core/data/job";
import { JobFormComponent } from "./job-form/job-form.component";

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
    dataSource: NbTreeGridDataSource<Job>;
    sortColumn: string;
    sortDirection: NbSortDirection = NbSortDirection.NONE;

    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<Job>,
        private jobData: JobData,
        private dialogService: NbDialogService
    ) {
        this.loadJobs();
    }

    loadJobs() {
        this.jobData.getJobs().subscribe((jobs) => {
            this.data = [];
            jobs.forEach((job) => this.data.push({ data: job }));
            this.dataSource = this.dataSourceBuilder.create(this.data);
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
                    job: job,
                },
            })
            .onClose.subscribe((name) => console.log(name));
    }
}
