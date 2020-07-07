import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from 'src/app/entities/appointment';
import { NgbCalendar, NgbDateStruct, NgbDatepickerConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { Speciality } from 'src/app/entities/speciality';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  @Input() selectedAppointment: Appointment;
  @Input('role') userRole: string;
  @Output() saveAppointment = new EventEmitter<Appointment>();

  
  // detailAppointmentForm: FormGroup;
  
  /* Constructor */
  constructor(private calendar: NgbCalendar, private ngbCalendarConfig: NgbDatepickerConfig) {
    // this.detailAppointmentForm = this.createFormGroup();
  }
  
  /* Class body */
  ngOnInit(): void {
  }

  // createFormGroup() {
  //   return new FormGroup({
  //     date: new FormControl('', [Validators.required]),
  //     speciality: new FormControl('', [Validators.required]),
  //     specialist: new FormControl('', [Validators.required]),
  //     schedule: new FormControl('', [Validators.required])
  //   });
  // }

  get formModel() {
    // return this.detailAppointmentForm.controls;
  }

  public logValues(){
    console.warn("DETAIL: LogValues() -> Form value: ", this.detailAppointmentForm.value)
  }

  onSubmit() {
    this.logValues()
  }

}
