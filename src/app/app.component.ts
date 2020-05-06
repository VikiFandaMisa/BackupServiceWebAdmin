import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { AuthenticationService } from './services/authentication.service';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BackupServiceWebAdmin';

  constructor (private authenticationService: AuthenticationService, private accountsService: AccountsService, public router: Router) { }

  ngOnInit(): void {
    this.authenticationService.loadToken();

    if (this.authenticationService.token == null && this.router.url != '/login')
      this.router.navigate(['login']);
  }
}
