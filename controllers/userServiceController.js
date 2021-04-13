import BaseController from './BaseController';

class UserServiceController {
  constructor() {
    this.baseUrl =
      'https://ndnn96vja1.execute-api.ap-south-1.amazonaws.com/dev/user-service/';
  }

  registerUser(requestBody, success, failure) {
    let url = `${this.baseUrl}register`;
    BaseController.sendRequest(url, 'post', requestBody, success, failure);
  }

  loginUser(requestBody, success, failure) {
    let url = `${this.baseUrl}login`;
    BaseController.sendRequest(url, 'post', requestBody, success, failure);
  }

  postAnswer(requestBody, success, failure) {
    let url = `${this.baseUrl}questionnaire`;
    BaseController.sendRequest(url, 'post', requestBody, success, failure);
  }
}

let userServiceController = new UserServiceController();

export default userServiceController;
