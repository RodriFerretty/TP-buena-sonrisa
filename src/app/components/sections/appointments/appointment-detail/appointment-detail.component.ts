import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from 'src/app/entities/appointment';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {
  @Input('appointment') appointment: Appointment;
  @Input('role') userRole: string;
  @Output() updateAppointment = new EventEmitter<Appointment>();

  constructor() { }

  ngOnInit(): void {
  }

}
