import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }
 
  public isLoggedInAndAdmin(): boolean {
    if ((this.userService.getCurrentUser() != null)) {
      return this.userService.getCurrentUser().role == 'admin'
    } 
    return false
  }
}
