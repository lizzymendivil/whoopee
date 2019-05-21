import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { QuizService } from './quiz.service';
import { QuizInterface } from './quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private quizService: QuizService, private formBuilder: FormBuilder) { }
  public quizz: QuizInterface[];
  public question: {};
  quizzForm: FormGroup;

  ngOnInit() {
    this.quizzForm = this.formBuilder.group({
      option: ['', Validators.required]
    });
    this.quizService.getQuiz().subscribe(quizz => {
      console.log('quiz', quizz);
      this.quizz = quizz;
      this.question = quizz[0];
      console.log('question', this.question);
    });
  }

  onSubmit() {
    console.log('click');
    if (this.quizzForm.valid) {
      console.log('valid');
    }
  }
}
