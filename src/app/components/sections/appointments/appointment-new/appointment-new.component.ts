import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from 'src/app/entities/appointment';
import { NgbCalendar, NgbDateStruct, NgbDatepickerConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { Speciality } from 'src/app/entities/speciality';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.css']
})
export class AppointmentNewComponent implements OnInit {

  @Input() allAppointments: Appointment[];
  @Input() allUsers: User[];
  @Input() allSpecialities: Speciality[];
  @Input('role') userRole: string;
  @Output() saveAppointment = new EventEmitter<Appointment>();

  public allSchedules: String[] = ["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45"]

  model: NgbDateStruct;
  date: { year: number, month: number };

  public filteredSpecialities: Speciality[]
  public filteredSpecialists: User[]
  public filteredSchedules: String[]

  newAppointmentForm: FormGroup;

  /* Constructor */
  constructor(private calendar: NgbCalendar, 
              private ngbCalendarConfig: NgbDatepickerConfig,
              public datepipe: DatePipe) {
    this.newAppointmentForm = this.createFormGroup();

    const current = new Date();
    ngbCalendarConfig.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    ngbCalendarConfig.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 2,
      day: current.getDate()
    };
    ngbCalendarConfig.outsideDays = 'hidden';
    ngbCalendarConfig.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;
  }

  /* Class body */
  ngOnInit(): void {
  }

  createFormGroup() {
    return new FormGroup({
      date: new FormControl('', [Validators.required]),
      speciality: new FormControl('', [Validators.required]),
      specialist: new FormControl('', [Validators.required]),
      schedule: new FormControl('', [Validators.required])
    });
  }

  get formModel() {
    return this.newAppointmentForm.controls;
  }

  public logValues() {
    // console.warn("NEW: LogValues() -> Form value: ", this.newAppointmentForm.value)
  }

  cancelNew() {
    this.filteredSchedules = []
    this.filteredSpecialists = []
    this.newAppointmentForm.patchValue({
      date: "",
      speciality: "",
      specialist: "",
      schedule: ""
    });
  }

  onSubmit() {
    this.logValues()
    this.emitNewAppointment()
  }

  private emitNewAppointment() {
    var newApp = new Appointment()
    newApp.specialist = this.newAppointmentForm.value.specialist.uid
    const jsDate = new Date(this.newAppointmentForm.value.date.year,
      this.newAppointmentForm.value.date.month - 1,
      this.newAppointmentForm.value.date.day);
    // console.log("Date en JS: ", jsDate)
    newApp.date = jsDate
    newApp.time = this.newAppointmentForm.value.schedule
    // console.log("En emitNewAppointment - newApp: ", newApp)
    this.saveAppointment.emit(newApp)

  }

  /* Input events */
  onDateSelected(event: any) {
    // this.filteredSpecialists = this.allUsers.filter(s => s.specialty === this.formModel.speciality.value.uid)
  }

  onSpecialitySelected() {
    this.filteredSpecialists = this.allUsers.filter(s => s.specialty === this.formModel.speciality.value.uid)
  }
  onSpecialistSelected() {
    // console.log("-NEW: OnSpecialistSelected --> ", this.newAppointmentForm.value)
    /**
     * Filtrar todos los turnos de esa fecha.
     * Filtrar los que sean del especialista seleccionado
     * Por cada uno de los turnos, tomar el horario y quitarlo del array de horarios
     */

    const selectedDate = new Date(this.newAppointmentForm.value.date.year,
      this.newAppointmentForm.value.date.month - 1,
      this.newAppointmentForm.value.date.day);
    
    var allAppointmentsInDateForSpecialist = this.allAppointments.filter(appointment => {
      // console.log("Appointment Specialist: ", s.specialist)
      // console.log("Form specialist: ", this.formModel.specialist.value)
      // console.log("SelectedDate: ", selectedDate)
      // console.log("Appointment date: ", s.date.toDate())
      // console.log("Date comparison: ", (selectedDate.toDateString() === s.date.toDate().toDateString()))
      // console.log("Appointment antes de sameDate: ", appointment)
      const appDate = new Date(appointment.date.seconds * 1000)
      // console.log("Appointment date: ", appDate)
      // console.log("SelectedDate: ", selectedDate)
      const sameDate = (selectedDate.toDateString() === appDate.toDateString())
      // console.log("Samedate: ", sameDate)
      return ((appointment.specialist === this.formModel.specialist.value.uid) && sameDate)
    })

    // console.log("Appointments filtered for that date and specialits: ", allAppointmentsInDateForSpecialist)
    let timesInDate = allAppointmentsInDateForSpecialist.map(a => a.time);

    var filtered = this.allSchedules.filter(
      function (e) {
        return this.indexOf(e) < 0;
      }, timesInDate);
    // console.log(filtered);

    this.filteredSchedules = filtered
    // console.log("-NEW: onSpecialistSelected -> filtered specialits --> ", this.filteredSpecialists)
  }


}
