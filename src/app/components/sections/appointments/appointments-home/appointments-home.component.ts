import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Appointment } from 'src/app/entities/appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'src/app/entities/user';
import { SpecialititesService } from 'src/app/services/specialitites.service';
import { Speciality } from 'src/app/entities/speciality';

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
  public allUsers: User[]
  public allSpecialities: Speciality[]

  public selectedAppointment: Appointment

  public textText = "pepe"
  @ViewChild('content') content: any;

  
  constructor(public userService: UserService, 
    private appointmentsService: AppointmentsService,
    private specialitiesService: SpecialititesService,
    private spinner: NgxSpinnerService) {
      console.log("Current user constructor: ", this.userService.currentUser)
     }

  ngOnInit(): void {
    console.log("Current user onInit: ", this.userService.currentUser)

    this.getAllAppointments()
    this.getAllUsers()
    this.getAllSpecialities()
  }

  onSelect(appointment: Appointment): void {
    this.selectedAppointment = appointment
    console.log("Current user onSelect: ", this.userService.getCurrentUser())
  }

  //get all appointments
  getAllAppointments() {
    this.spinner.show()
    //https://itnext.io/3-common-mistakes-when-using-angular-ngrx-firebase-9de4e241d866
    //https://www.digitalocean.com/community/tutorials/angular-takeuntil-rxjs-unsubscribe
    console.log("en getAllAppointments")
    this.appointmentsService.getAll().pipe(
      takeUntil(this.destroy$)).subscribe(appointments => {
      console.log(appointments);
      this.allAppointments = appointments
      this.filteredAppointments = appointments
      this.spinner.hide()
    });
  }

  //get all users in order to map in table the name to appointment client and specialist uid
  getAllUsers() {
    console.log("en getAllUsers")
    this.userService.getAll().pipe(
      takeUntil(this.destroy$)).subscribe(users => {
      console.log("All users on home:", users);
      this.allUsers = users
    });
  }

  getAllSpecialities() {
    console.log("en getAllSpecialities")
    this.specialitiesService.getAll().pipe(
      takeUntil(this.destroy$)).subscribe(specialities => {
      console.log("All specialities on home:", specialities);
      this.allSpecialities = specialities
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  /*
  * Methods to get names and values for table.
  */

  getValuesForTable() {
    if (this.userService.getCurrentUser()?.role == 'client') {
      return this.filteredAppointments?.filter(appoint => 
        appoint.client == this.userService.getCurrentUser()?.uid
        )
    } else if (this.userService.getCurrentUser()?.role == 'specialist') {
      return this.filteredAppointments?.filter(appoint => 
        appoint.specialist == this.userService.getCurrentUser()?.uid
        )
    }
  }

  getClientNameForUid(uid: string){
    const user = this.allUsers?.find(x => x.uid == uid)
    return user?.displayName
  }
  getSpecialistNameForUid(uid: string){
    const user = this.allUsers?.find(x => x.uid == uid)
    return user?.displayName
  }
  getStatus(status:string) {
    switch (status) {
      case "active":
        return "Activo"
      case "cancelled":
        return "Cancelado"
      case "attended":
        return "Atendido"
      default:
        return "- - - -"
    }
  }

  saveNewAppointment(newAppointment: Appointment){
    console.log("En saveNewAppointment: -> ", newAppointment)
    newAppointment.attended = false
    newAppointment.client = this.userService.getCurrentUser().uid
    newAppointment.status = "active"
    this.spinner.show()
    this.appointmentsService.create(newAppointment).then((result) => {

    }).finally(() => {
      this.spinner.hide()
    }).catch((error) => {
      window.alert(error.message)
    })
  } 

  updateAppointment(updatedAppointment: Appointment){
    console.log("En updateAppointment: -> ", updatedAppointment)
    this.spinner.show()
    this.appointmentsService.update(updatedAppointment).then((result) => {

    }).finally(() => {
      this.spinner.hide()
    }).catch((error) => {
      window.alert(error.message)
    })
  } 
}
