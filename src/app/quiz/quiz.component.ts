import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  
  constructor(private quizService: QuizService, private formBuilder: FormBuilder) { }
  public quiz = '';
  public quizzes = [];
  quizzForm: FormGroup;

  ngOnInit() {
    this.quizzForm = this.formBuilder.group({
      option: ['', Validators.required]
    });
    this.quizService.getQuiz().subscribe(quizzes => {
      console.info('quizzes', quizzes);
      this.quizzes = quizzes;
    });
  }

  onSubmit() {
    console.log('click');
    if (this.quizzForm.valid) {
      console.log('valid');
    }
  }
}
