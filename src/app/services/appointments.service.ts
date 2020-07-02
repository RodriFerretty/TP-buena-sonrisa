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

  public create(product: Appointment) {
    return this.afStore.collection<Appointment>('appointments').add(Object.assign({}, product))
  }

  public update(uid: string, product: Appointment) {
    return this.afStore.doc<Appointment>(`appointments/${uid}`).set(Object.assign({}, product), {merge: true});
  }

  public delete(uid: string) {
    return this.afStore.doc<Appointment>(`appointments/${uid}`).delete();
  }
}
