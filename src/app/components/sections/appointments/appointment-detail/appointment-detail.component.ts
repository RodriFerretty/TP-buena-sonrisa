import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from 'src/app/entities/appointment';
import { Survey } from 'src/app/entities/survey';
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
  @Input() allSurveys: Survey[];
  @Input('role') userRole: string;
  @Output() updateAppointment = new EventEmitter<Appointment>();
  @Output() saveSurvey = new EventEmitter<Survey>();

  @ViewChild('closeModal') closeModal: ElementRef;
  // detailAppointmentForm: FormGroup;
  markedAsAttended = false
  specialistReviewForm = ""
  
  /* USER RATING */
  rateClinic = 1;
  hoveredClinic = 0;
  rateSpecialist = 1;
  hoveredSpecialist = 0;
  clientReview = ""
  readonly = false;
  
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

  canFillPoll() {
    return (this.userRole == "client" && this.selectedAppointment?.status == 'attended')
  }

  hasSurvey(): boolean {
    const survey = this.allSurveys?.find(x => x.appointmentId == this.selectedAppointment?.uid)
    console.log("Survey inside hasSurvey: ", survey)
    if (survey) {
      this.rateClinic = survey.clinicRate;
      this.rateSpecialist = survey.specialistRate;
      this.clientReview = survey.userSurveyReview
      return true
    } else {
      this.rateClinic = 0;
      this.rateSpecialist = 0;
      this.clientReview = "";
      return false
    }
  }

  getSurveyButtonTitle() {
    return (this.hasSurvey()) ?  "Ver encuesta" :  "Cargar encuesta"
  }

  markAttended(){
    this.markedAsAttended = true
  }

  closeModalForm() {
    this.markedAsAttended = false
    this.rateClinic = 1;
    this.hoveredClinic = 0;
    this.rateSpecialist = 1;
    this.hoveredSpecialist = 0;
    this.clientReview = ""
    this.readonly = false;
  }

  /***** USER LOAD APPOINTMENT SURVEY *****/
  saveAppointmentSurvey(){
    console.log("rateClinic: ", this.rateClinic)

    const appointmentId = this.selectedAppointment.uid
    var newSurvey = new Survey()
    newSurvey.appointmentId = appointmentId
    newSurvey.clinicRate = this.rateClinic
    newSurvey.specialistRate = this.rateSpecialist
    newSurvey.userSurveyReview = this.clientReview

    console.log("newSurvey en modal:", newSurvey)
    this.saveSurvey.emit(Object.assign({}, newSurvey))
    this.closeModal.nativeElement.click();
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