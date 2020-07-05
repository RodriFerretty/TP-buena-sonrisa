import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Speciality } from '../entities/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialititesService { constructor(private afStore: AngularFirestore) { }

public getAll() {
  return this.afStore.collection<Speciality>('specialities').valueChanges();
}

public getOne(uid: string) {
  return this.afStore.doc<Speciality>(`specialities/${uid}`).valueChanges();
}

public create(product: Speciality) {
  return this.afStore.collection<Speciality>('specialities').add(Object.assign({}, product))
}

public update(uid: string, product: Speciality) {
  return this.afStore.doc<Speciality>(`specialities/${uid}`).set(Object.assign({}, product), {merge: true});
}

public delete(uid: string) {
  return this.afStore.doc<Speciality>(`specialities/${uid}`).delete();
}
}
