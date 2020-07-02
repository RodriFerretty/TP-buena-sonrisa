import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    // console.log("---- En isLoggedIn(): ", this.userService.getCurrentUser())
    return (this.userService.getCurrentUser() != null)
  }

  public getDisplayName(): string {
    return this.userService.getCurrentUser().displayName
  }

}
