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
  @Input() allAppointments: Appointment[];
  @Input() allSpecialists: User[];
  @Input() allSpecialities: Speciality[];
  @Input('role') userRole: string;
  @Output() saveAppointment = new EventEmitter<Appointment>();

  model: NgbDateStruct;
  date: { year: number, month: number };

  public specialities: String[] = ["consulta", "mecanica", "rayos"]
  public specialists: String[] = ["Especialista1", "Especialista2", "Especialista3"]
  public schedules: String[] = ["10:00", "10:15", "10:30"]

  newAppointmentForm: FormGroup;
  
  /* Constructor */
  constructor(private calendar: NgbCalendar, private ngbCalendarConfig: NgbDatepickerConfig) {
    const current = new Date();
    ngbCalendarConfig.minDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 1, day: current.getDate()
    };
    ngbCalendarConfig.maxDate = {
      year: current.getFullYear(), month:
        current.getMonth() + 2, day: current.getDate()
    };

    ngbCalendarConfig.outsideDays = 'hidden';
    ngbCalendarConfig.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;
  }
  
  /* Class body */
  ngOnInit(): void {
  }

  get formModel() {
    return this.newAppointmentForm.controls;
  }

  createFormGroup() {
    return new FormGroup({
      speciality: new FormControl('', [Validators.required]),
      specialist: new FormControl('', [Validators.required]),
      schedule: new FormControl('', [Validators.required])
    });
  }

}
