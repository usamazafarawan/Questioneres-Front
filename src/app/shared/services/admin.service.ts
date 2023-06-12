import { Injectable } from '@angular/core';
import { RequestService } from '.';
import { ApiUrl } from '../resource-reference';
import { Questionnaire } from 'src/app/modules/admin/model/Questionair.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private requestService: RequestService) {}

  /**
   * gets all questions from db.
   * @returns
   */
  getQuestions() {
    return this.requestService.getData( `${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/`);
  }

  /**
   * adds new question in questions db.
   * @param question array.
   * @returns
   */
  addQuestion(question: Questionnaire) {
    return this.requestService.addData(`${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/addQuestion`,question);
  }

  /**
   * gets question by Id.
   * @param questionId string.
   * @returns
   */
  getQuestionById(questionId: string) {
    return this.requestService.getData(`${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/${questionId}`);
  }

  /**
   * updates question in Questions table.
   * @param question obj.
   * @returns
   */
  updateQuestion(_id:any,question: Questionnaire) {
    return this.requestService.updateData(`${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/${question._id}`,question);
  }

  /**
   * deletes question by Id from db.
   * @param questionId strig.
   * @returns
   */
  deleteQuestion(questionId: string) {
    return this.requestService.deleteData(
      `${ApiUrl.apiBaseUrl}/${ApiUrl.questionairre}/${questionId}`
    );
  }

   /**
   * adds New User .
   * @param user User.
   * @returns
   */
  addUser(user: User) {
    return this.requestService.addData(`${ApiUrl.apiBaseUrl}/${ApiUrl.addUser}/`, user);   
  }
}
