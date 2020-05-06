import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public router: Router,private authenticationService: AuthenticationService){}

  Logout1()
  {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
  }

}
