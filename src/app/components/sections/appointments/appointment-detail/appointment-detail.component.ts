import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from 'src/app/entities/appointment';
import { NgbCalendar, NgbDateStruct, NgbDatepickerConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  @Input('appointment') appointment: Appointment;
  @Input('role') userRole: string;
  @Output() updateAppointment = new EventEmitter<Appointment>();

  model: NgbDateStruct;
  date: { year: number, month: number };

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

  ngOnInit(): void {
  }

}
