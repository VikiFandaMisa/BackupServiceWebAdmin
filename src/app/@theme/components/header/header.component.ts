import { Component, OnDestroy, OnInit } from "@angular/core";
import {
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
    NbDialogService,
} from "@nebular/theme";

import { AccountData } from "../../../@core/data/account";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil, filter } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import { SelfFormComponent } from "./self-form/self-form.component";

@Component({
    selector: "ngx-header",
    styleUrls: ["./header.component.scss"],
    templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public readonly materialTheme$: Observable<boolean>;
    userPictureOnly: boolean = false;
    user: any;

    themes = [
        {
            value: "default",
            name: "Light",
        },
        {
            value: "dark",
            name: "Dark",
        },
        {
            value: "cosmic",
            name: "Cosmic",
        },
    ];

    currentTheme = "default";

    userMenu = [
        { title: "Settings" },
        { title: "Log out", link: "/auth/logout" },
    ];

    public constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private accountsService: AccountData,
        private layoutService: LayoutService,
        private breakpointService: NbMediaBreakpointsService,
        private dialogService: NbDialogService
    ) {
        this.materialTheme$ = this.themeService.onThemeChange().pipe(
            map((theme) => {
                const themeName: string = theme?.name || "";
                return themeName.startsWith("material");
            })
        );
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;

        this.loadSelf();

        const { xl } = this.breakpointService.getBreakpointsMap();
        this.themeService
            .onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
            );

        this.themeService
            .onThemeChange()
            .pipe(
                map(({ name }) => name),
                takeUntil(this.destroy$)
            )
            .subscribe((themeName) => {
                this.currentTheme = themeName;
            });

        this.menuService
            .onItemClick()
            .pipe(filter(({ tag }) => tag === "userMenu"))
            .subscribe((bag) => {
                if (bag.item.title == "Settings") {
                    this.dialogService
                        .open(SelfFormComponent, {
                            context: {
                                account: {
                                    id: this.user.id,
                                    username: this.user.username,
                                    password: this.user.password,
                                    admin: this.user.admin,
                                    email: this.user.email,
                                    sendReports: this.user.sendReports,
                                },
                            },
                        })
                        .onClose.subscribe((account) => {
                            console.log(account);
                            if (account != null) this.accountsService.putAccount(account).subscribe(() => this.loadSelf());
                        });
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadSelf() {
        this.accountsService.getSelf().subscribe((self) => (this.user = self));
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, "menu-sidebar");
        this.layoutService.changeLayoutSize();

        return false;
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }
}
