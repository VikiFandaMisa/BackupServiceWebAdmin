import { Component, OnInit } from "@angular/core";
import { NbAuthService } from "@nebular/auth";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'login-redirect',
  template: '',
})
export class LoginRedirectComponent implements OnInit {
    constructor(private authService: NbAuthService, public router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.authService
                    .isAuthenticated()
                    .subscribe((isAuthenticated) => {
                        if (!isAuthenticated && val.url.startsWith("/pages"))
                            this.router.navigate(["/auth/login"]);
                    });
            }
        });
    }
}

