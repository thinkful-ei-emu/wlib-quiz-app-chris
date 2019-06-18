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
    for (let i = 0; i < this.model.asked[0].answers.length; i++) {
      question += `<input type="radio" name="questions" class="js-questions"> ${this.model.asked[0].answers[i]}<br>`;
    }

    return `
      <div>
        <p>
          ${this.model.asked[0].text}
        </p>
        <p>
          <form class="js-questions-form">
           ${question}
          </form>
        </p>
      </div>
      <div class="buttons">
        <button class="submit">Submit</button>
      </div>
      `;
  }

  _generateAnswer() {
    let text = '';
    if (this.model.userAnswer === this.model.correctAnswer) {
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

    // else if (this.model.answerCurrentQuestion(this.model.userAnswer)) {
    //   // Quiz has started
    //   html = this._generateAnswer();
    // }

    else if (!this.model.active) {
      // Quiz has started
      html = this._generateOutro();
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

  handleSubmit() {
    this.model.userAnswer = $('input[name="questions"]:checked').val();
    console.log(this.model.userAnswer);
    this.model.answerCurrentQuestion(this.model.userAnswer);
    this.model.update();
  }

  handleContinue() {
    console.log('hello world');
  }
}

export default QuizDisplay;