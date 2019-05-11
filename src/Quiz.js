import Question from './Question';
import TriviaApi from './TriviaApi';

class Quiz {

  static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false;

    // TASK: Add more props here per the exercise
    this.score = 0;
    this.scoreHistory = [];

  }

  // Example method:
  startGame() {
    const triviaApi = new TriviaApi();
    triviaApi.fetchQuestions(Quiz.DEFAULT_QUIZ_LENGTH)
      .then(data => this.unasked.push(...data.results))
      .catch(err => console.log(err.message));

    this.active = true;
  }
}

export default Quiz;
