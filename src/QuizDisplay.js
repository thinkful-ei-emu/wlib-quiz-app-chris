import $ from 'jquery';
import Renderer from './lib/Renderer';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'click .next-question': 'handleContinue',
      'submit .js-questions-form': 'handleSubmit',
      'click .new-game': 'handleNewGame'
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
        <p>
          Test your smarts and see how high you can score!
        </p>
      </div>
      <div class="buttons">
        <button class="start-quiz">Start Quiz</button>
      </div>
    `;
  }

  _generateQuestion() {
    let question = '';
    for (let i = 0; i < this.model.asked[0].answers.length; i++) {
      question += `<input type="radio" name="questions" class="js-questions" value="${this.model.asked[0].answers[i]}"> ${this.model.asked[0].answers[i]}<br>`;
    }

    return `
      <div>
        <p>
          ${this.model.asked[0].text}
        </p>
        <form class="js-questions-form">
           ${question}
            <div class="buttons">
                <button type="submit" class="submit">Submit</button>
            </div>
        </form>
      </div>
      `;
  }

  _generateAnswer() {
    let text = '';
    if (this.model.getCurrentQuestion().getAnswerStatus() === 1) {
      text = `
        <p>
            You got it!
        </p>
        `;
    }
    else {
      text = `
        <p>
            Sorry, that's incorrect.
        </p>
        <p>
            You answered:
        </p>
        <p>
            ${this.model.asked[0].userAnswer}
        </p>`;
    }
    return `
      <div>
        <p>
          ${this.model.asked[0].text}
        </p>
        ${text}
        <p>
            The correct answer was:
        </p>
        <p>
          ${this.model.asked[0].correctAnswer}
        </p>
      </div>
      <div class="buttons">
        <button class="next-question">Continue</button>
      </div>
      `;
  }

  _generateOutro() {
    let highScore = 0;
    let newHighScore = '';
    if (this.model.score > highScore) {
      newHighScore = 'That\'s a new high score!';
    }
    return `
      <div>
        <p>
          Good job!
        </p>
        <p>
          Your final score was ${this.model.score} out of 5.
        </p>
        <p>
          ${newHighScore}
        </p>
      </div>
      <div class="buttons">
      <button class="new-game">Play Again</button>
      </div>
      `;
  }

  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }

    else if (this.model.active === false) {
      // Quiz has started
      html = this._generateOutro();
    }
      
    else if (this.model.getCurrentQuestion().getAnswerStatus() !== -1) {
      // Quiz has started
      html = this._generateAnswer();
    }
            
    else {
      // Quiz has started
      html = this._generateQuestion();
    }
    
    return html;
  }

  handleStart() {
    this.model.startGame();
  }

  handleSubmit(e) {
    e.preventDefault();
    const userAnswer = new FormData(e.target).get('questions');
    this.model.answerCurrentQuestion(userAnswer);
    this.model.update();
  }

  handleContinue() {
    if (this.model.unasked.length === 0) {
      this.model.active = false;
    }
    else {
      this.model.nextQuestion();
    }
    this.model.update();
  }

  handleNewGame(){
    this.model.asked = [];
    console.log(this.model.score);
    let x = this.model.score;
    this.model.scoreHistory.push(x);
    console.log(this.model.scoreHistory);
    this.model.update();
  }
}

export default QuizDisplay;