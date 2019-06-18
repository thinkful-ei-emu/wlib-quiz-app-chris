import $ from 'jquery';
import Renderer from './lib/Renderer';
import Question from './Question';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'click .next-question': 'handleContinue',
      'click .submit': 'handleSubmit'
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
    console.log(this.model.asked[0].correctAnswer);
    for (let i = 0; i < this.model.asked[0].answers.length; i++) {
      question += `<input type="radio" name="questions"> ${this.model.asked[0].answers[i]}<br>`;
    }
    console.log(question);

    return `
      <div>
        <p>
          ${this.model.asked[0].text}
        </p>
        <p>
          <form>
           ${question}
          </form>
        </p>
      </div>
      <div class="buttons">
        <button class="submit">Submit</button>
      </div>
      `;
  }

  _generateCorrectAnswer() {
    return `
      <div>
        <p>
          ${this.model.asked[0].text}
        </p>
        <p>
          You got it!
        </p>
        <p>
          The correct answer was:
        </p>
        <p>
          ${this.model.asked[0].correctAnswer}
        </p>
      </div>
      <div class="buttons">
        <button class=".next-question">Continue</button>
      </div>
      `;
  }

  _generateIncorrectAnswer() {
    return `
      <div>
        <p>
          ${this.model.asked[0].text}
        </p>
        <p>
          Sorry, that's incorrect.
        </p>
        <p>
          You answered:
        </p>
        <p>
          ${this.model.asked[0].userAnswer}
        </p>
        <p>
          The correct answer was:
        </p>
        <p>
          ${this.model.asked[0].correctAnswer}
        </p>
      </div>
      <div class="buttons">
        <button class=".next-question">Continue</button>
      </div>
      `;
  }

  _generateOutro() {
    return `
      <div>
        <p>
          Good job!
        </p>
        <p>
          Your final score was ${this.model.score} out of 5.
        </p>
        <p>
          
        </p>
      </div>
      <div class="buttons">
      <button class="start-quiz">Play Again</button>
      </div>
      `;
  }

  template() {
    let html = '';
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }

    else if (this.model.asked.length > 0) {
      // Quiz has started
      html = this._generateQuestion();
    }

    else if (this.model.asked.length > 0) {
      // Quiz has started
      html = this._generateCorrectAnswer();
    }

    else if (this.model.asked.length > 0) {
      // Quiz has started
      html = this._generateIncorrectAnswer();
    }

    else if (!this.model.active) {
      // Quiz has started
      html = this._generateOutro();
    }


    
    return html;
  }

  handleStart() {
    this.model.startGame();
  }

  handleSubmit() {
    this.model.answerCurrentQuestion();
  }

  handleContinue() {
    console.log('hello world');
  }
}

export default QuizDisplay;