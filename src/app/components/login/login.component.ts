import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  submitCredentials = (username: string, password: string): void => {
    this.authenticationService.authenticate(username, password)
    .then(
      () => {
        console.log(this.authenticationService.account.username)
      },
      (error) => {
        if (error.status == 401)
          this.message = "Wrong password or username";
        else
          this.message = "Error " + error.status;
      }
    );
  }
}
