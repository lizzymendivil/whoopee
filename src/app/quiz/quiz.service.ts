import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QuizInterface } from './quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private firestore: AngularFirestore) {
    this.quizCollection = firestore.collection<QuizInterface>('quiz');
    this.quiz = this.quizCollection.valueChanges();
   }
  private quizCollection: AngularFirestoreCollection<QuizInterface>;
  private quiz: Observable<QuizInterface[]>;

  getQuiz() {
    return this.quiz = this.quizCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as QuizInterface;
        return data;
      });
    }));
  }
}
