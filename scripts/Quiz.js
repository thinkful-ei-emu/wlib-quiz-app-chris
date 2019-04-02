/* global Question, Model */

/* Quiz class */
class Quiz extends Model {          // eslint-disable-line no-unused-vars

  static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    super();

    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];

    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
  }

  /** Gets unique set of questions from Quiz.QUIZ_DATA */
  // Private method
  _getInitialQuestions() {
    const totalLength = Quiz.QUIZ_DATA.length;
    const uniqueQuestionIndexes = new Set();
    while (uniqueQuestionIndexes.size < Quiz.DEFAULT_QUIZ_LENGTH) {
      uniqueQuestionIndexes.add(Math.floor(Math.random() * totalLength));
    }

    uniqueQuestionIndexes.forEach(qIndex => this.unasked.push(new Question(Quiz.QUIZ_DATA[qIndex])));
  }

  // Private method
  _increaseScore() {
    this.score++;
  }

  /**
   * (private method)
   * Determines if more than one instance of `targetScore` in history
   * Returns {Boolean} 
   */
  _hasDupeScore(targetScore) {
    let count = 0;
    for (const score of this.scoreHistory) {
      if (score === targetScore) {
        count++;
        if (count > 1) return true;
      }
    }
    return false;
  }

  /**
   * Resets all props (except scoreHistory) and starts new quiz session
   */
  startNewGame() {
    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.active = true;

    this._getInitialQuestions();
    this.nextQuestion();
  }

  /**
   * Moves Quiz to next question
   * Returns {Question} - current question
   */
  nextQuestion() {
    const current = this.getCurrentQuestion();

    if (current && current.userAnswer === undefined) {
      throw new Error('Must answer question before advancing to next');
    }

    if (this.unasked.length === 0) {
      this.active = false;
      this.scoreHistory.unshift(this.score);
      return null;
    }
    
    this.asked.unshift(this.unasked.pop());
    return this.asked[0];
  }

  /**
   * Sets status of current Question to incorrect (0) or correct (1)
   * Status can only be set if at default unanswered -1 
   * Returns {boolean}
   */
  answerQuestion(answerText) {
    const current = this.getCurrentQuestion();
    let answerStatus = current.getAnswerStatus();

    if (answerStatus !== -1) {
      throw new Error('Cannot answer question twice');
    }

    current.submitAnswer(answerText);
    answerStatus = current.getAnswerStatus();

    if (answerStatus === 1) {
      this._increaseScore();
    }

    return answerStatus === 1;
  }

  getCurrentQuestion() {
    return this.asked[0];
  }

  getHighScore() {
    return this.scoreHistory.length < 1 ? 0 : Math.max(...this.scoreHistory);
  }

  isNewHighScore() {
    const newScore = this.scoreHistory[0];
    const highestScore = Math.max(...this.scoreHistory);

    if (newScore === highestScore && this._hasDupeScore(newScore)) {
      return false;
    }

    if (newScore >= highestScore) {
      return true;
    }

    return false;
  }
}
