import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QuizInterface } from './quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizCollection: AngularFirestoreCollection<QuizInterface>;
  private quiz: Observable<QuizInterface[]>;
  // private quizDoc: AngularFirestoreDocument<QuizInterface>;

  constructor(private firestore: AngularFirestore) {
    this.quizCollection = firestore.collection<QuizInterface>('quiz');
    this.quiz = this.quizCollection.snapshotChanges().pipe(
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() as QuizInterface;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
  }

  getQuiz() {
    return this.quiz;
  }

  getNextQuestion() {
    return this.quiz[0];
  }
}
