import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from 'src/app/entities/appointment';
import { NgbCalendar, NgbDateStruct, NgbDatepickerConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { Speciality } from 'src/app/entities/speciality';

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
  constructor(private calendar: NgbCalendar, private ngbCalendarConfig: NgbDatepickerConfig) {
    this.newAppointmentForm = this.createFormGroup();

    const current = new Date();
    ngbCalendarConfig.minDate = { year: current.getFullYear(), 
                                  month: current.getMonth() + 1, 
                                  day: current.getDate() };
    ngbCalendarConfig.maxDate = { year: current.getFullYear(), 
                                  month: current.getMonth() + 2, 
                                  day: current.getDate() };
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

  public logValues(){
    console.warn("NEW: LogValues() -> Form value: ", this.newAppointmentForm.value)
  }

  cancelNew(){
    this.newAppointmentForm.reset()
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
    console.log("Date en JS: ", jsDate)
    newApp.date = "010920"
    newApp.time = this.newAppointmentForm.value.schedule
    console.log("En emitNewAppointment - newApp: ", newApp)
    this.saveAppointment.emit(newApp)
    
  }



  /* Input events */
  onDateSelected(event: any) { 
    this.filteredSpecialists = this.allUsers.filter(s => s.specialty === this.formModel.speciality.value.uid)
  }

  onSpecialitySelected() {
    this.filteredSpecialists = this.allUsers.filter(s => s.specialty === this.formModel.speciality.value.uid)
  }
  onSpecialistSelected() {
    console.log("-NEW: OnSpecialistSelected --> ", this.newAppointmentForm.value)
    /**
     * Filtrar todos los turnos de esa fecha.
     * Filtrar los que sean del especialista seleccionado
     * Por cada uno de los turnos, tomar el horario y quitarlo del array de horarios
     */
    this.filteredSchedules = this.allSchedules
    //this.filteredSchedules = this.allUsers.filter(s => s.specialty === this.formModel.speciality.value.uid)
    console.log("-NEW: onSpecialistSelected -> filtered specialits --> ", this.filteredSpecialists)
  }


}
