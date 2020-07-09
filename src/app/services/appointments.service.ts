import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Appointment } from '../entities/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  constructor(private afStore: AngularFirestore) { }

  public getAll() {
    return this.afStore.collection<Appointment>('appointments').valueChanges();
  }

  public getOne(uid: string) {
    return this.afStore.doc<Appointment>(`appointments/${uid}`).valueChanges();
  }

  public create(appointment: Appointment) {
    return this.afStore.collection<Appointment>('appointments').add(Object.assign({}, appointment)).then(createResponse => {
      appointment.uid = createResponse.id;
      this.update(appointment);
    });
  }

  public update(appointment: Appointment) {
    return this.afStore.doc<Appointment>(`appointments/${appointment.uid}`).set(Object.assign({}, appointment), {merge: true});
  }

  public delete(uid: string) {
    return this.afStore.doc<Appointment>(`appointments/${uid}`).delete();
  }
}
