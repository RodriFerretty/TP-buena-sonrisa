import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Survey } from '../entities/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
  constructor(private afStore: AngularFirestore) { }

  public getAll() {
    return this.afStore.collection<Survey>('surveys').valueChanges();
  }

  public create(survey: Survey) {
    return this.afStore.collection<Survey>('surveys').add(Object.assign({}, survey)).then(createResponse => {
      survey.uid = createResponse.id;
      this.update(survey);
    });
  }

  public update(survey: Survey) {
    return this.afStore.doc<Survey>(`surveys/${survey.uid}`).set(Object.assign({}, survey), {merge: true});
  }
}
