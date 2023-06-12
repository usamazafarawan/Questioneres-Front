import { Component, OnInit } from '@angular/core';
import { TimeoutError } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AdminService, LocalStorageService } from 'src/app/shared/services';
import { Questionnaire } from '../../admin/model/Questionair.model';

@Component({
  selector: 'app-questionnair',
  templateUrl: './questionnair.component.html',
  styleUrls: ['./questionnair.component.css']
})
export class QuestionnairComponent implements OnInit {

  questionList: Questionnaire[] = [];
  selectedValue: string = '';
  userAnswers: any[] = [];
  totalScore: number = 0;
  isdisable: boolean = false;
  showfm: boolean = true;
  formSubmitted: boolean = false;
  percenttage: number = 0;
  userQuseetionResult: any[] = []
  userAnswerResult: any[] = []
  totalMarks = 0;
  index = 1
  time: any = 10;
  timePerQuestion: any;
  interval: any = 0;
  questionCounter: any = 1;
  oneQuestion: any;
  flageLast: any = false;
  totalQuestion: any;
  allQuestions: any;
  pager = {
    index: 0,
    count: 0
  };

  currentQuestion: any;
  remainingTime: number;
  timeout: any;
  currentUser:User = new User();


  constructor(private adminService: AdminService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.localStorage.get('user')

    this.LoadUserQusestion();

  }

  /**
 * send api call to get Questions List.
 */
  LoadUserQusestion() {
    
    this.adminService.getQuestions().subscribe((questions: Questionnaire[]) => {
      if (questions) {
        this.questionList = questions;
        this.pager.count = this.questionList.length;
        this.questionList.forEach((x, ind) => {
          this.totalMarks += x.marks;
        });
      }
      this.getCurrentQuestion();
      this.startCountdown();
    });
  }

  private getCurrentQuestion() {
    this.currentQuestion = this.questionList[this.pager.index];
    this.remainingTime = this.currentQuestion?.questionTime;
   
    if(this.timeout){
      clearTimeout(this.timeout);
    }

   this.timeout = setTimeout(() => {
      this.currentQuestion ? this.nextQuestion() 
      : (!this.currentQuestion ? this.submitAnswer() 
      : this.formSubmitted = true)  
    }, this.currentQuestion?.questionTime * 1000);


  }


  public nextQuestion() {
    this.pager.index++;
    this.getCurrentQuestion();
  }

  private startCountdown() {
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      }
    }, 1000);
  }

  selectAnswer(question: Questionnaire, selectedAnswer: any) {
    question.selectedAnswer = selectedAnswer;
    question.isCorrect = selectedAnswer === question.answer;
    const index = this.userAnswers.findIndex((answer: any) => answer._id == question._id)
    if (index <= -1) {
      this.userAnswers.push(question);
    } else {
      this.userAnswers[index] = question;
    }
  };

  // get user Asnwer and calculat the total number;
  submitAnswer() {
    this.userAnswers.forEach((answer) => {
      if (answer.isCorrect) {
        this.totalScore += answer.marks;
      };
    });

    // if (this.userAnswers.length == this.questionList.length) {
    //   this.isdisable = true;
    //   this.LoadUserQusestion();
    //   this.showfm = !this.showfm
    // }
    this.percenttage = (this.totalScore / this.totalMarks) * 100;
    this.formSubmitted = true;
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    
  }

}
