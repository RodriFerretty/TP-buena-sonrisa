import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from 'src/app/entities/appointment';
import { NgbCalendar, NgbDateStruct, NgbDatepickerConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { Speciality } from 'src/app/entities/speciality';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  @Input() selectedAppointment: Appointment;
  @Input() allUsers: User[];
  @Input('role') userRole: string;
  @Output() updateAppointment = new EventEmitter<Appointment>();

  @ViewChild('closeModal') closeModal: ElementRef;
  // detailAppointmentForm: FormGroup;
  markedAsAttended = false
  specialistReviewForm = ""
  
  /* Constructor */
  constructor() { }
  /* Class body */
  ngOnInit(): void { }

  getUsernameFor(uid: string) {
    const user = this.allUsers?.find(x => x.uid == uid)
    return user?.displayName
  }

  getStatus() {
    let status: string = this.selectedAppointment?.status;
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

  disableSpecialistReview() {
    if (this.userRole == "client") { return true }

    if (this.userRole == "specialist") {
      return !this.markedAsAttended
    }
    return false
  }

  canCancelAppointment() {
    return (this.userRole == "client" && this.selectedAppointment?.status == 'active')
  }

  canMarkAsAttended() {
    return (this.userRole == "specialist" && this.selectedAppointment?.status == 'active' && !this.markedAsAttended)
  }

  markAttended(){
    this.markedAsAttended = true
  }

  closeModalForm() {
    this.markedAsAttended = false
  }

  /****** SPECIALIST MARK AS ATTENDED ******/
  updateAppointmentReviewAndStatus(){
    this.closeModal.nativeElement.click();
    this.selectedAppointment.status = "attended"
    this.updateAppointment.emit(this.selectedAppointment)
  }

  /***** USER CANCEL APPOINTMENT *****/
  cancelAppointment() {
    console.log("Cancelado")
    this.closeModal.nativeElement.click();
    this.selectedAppointment.status = "cancelled"
    this.updateAppointment.emit(this.selectedAppointment)
  }
}