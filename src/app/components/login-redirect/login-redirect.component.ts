import { Component, OnInit } from "@angular/core";
import { NbAuthService } from "@nebular/auth";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    selector: "login-redirect",
    template: "",
})
export class LoginRedirectComponent implements OnInit {
    constructor(private authService: NbAuthService, public router: Router) {}

    ngOnInit(): void {
        this.authService.isAuthenticated().subscribe((isAuthenticated) => {
            if (!isAuthenticated) this.router.navigate(["/auth/login"]);
        });
    }
}
