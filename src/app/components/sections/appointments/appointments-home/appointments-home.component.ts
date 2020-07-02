import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Appointment } from 'src/app/entities/appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-appointments-home',
  templateUrl: './appointments-home.component.html',
  styleUrls: ['./appointments-home.component.css']
})
export class AppointmentsHomeComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public currentUserRole: string
  public allAppointments: Appointment[]
  public filteredAppointments: Appointment[]
  
  public textText = "pepe"

  @ViewChild('content') content: any;
  
  constructor(private userService: UserService, 
    private appointmentsService: AppointmentsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllAppointments()
    this.getAllUsers()
  }

  onSelect(appointment: Appointment): void {
    this.textText = appointment.date
    //Open modal with Appointment
      // if(!true){

      // } else {
      //    this.content.open();
      // }
  }


  //get all appointments
  getAllAppointments() {
    // this.spinner.show()
    //https://itnext.io/3-common-mistakes-when-using-angular-ngrx-firebase-9de4e241d866
    //https://www.digitalocean.com/community/tutorials/angular-takeuntil-rxjs-unsubscribe
    console.log("en getAllAppointments")
    this.appointmentsService.getAll().pipe(
      takeUntil(this.destroy$)).subscribe(appointments => {
      console.log(appointments);
      this.allAppointments = appointments
      this.filteredAppointments = appointments
    });
  }

  //get all users in order to map in table the name to appointment client and specialist uid
  getAllUsers() {
    console.log("en getAllUsers")
    this.userService.getAll().pipe(
      takeUntil(this.destroy$)).subscribe(users => {
      console.log(users);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
