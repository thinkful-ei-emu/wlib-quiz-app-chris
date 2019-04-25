import Renderer from './lib/Renderer';

class QuizDisplay extends Renderer {
  // TASK: You will need to register all your events in this method
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
    };
  }

  // TASK: This is one example generator function. You will need one for all templates
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
      <div>
        <button class="start-quiz">Start Quiz</button>
      </div>
    `;
  }

  // TASK: This is where you must return an HTML template
  template() {
    let html;

    if (this.model.active) {
      html = this._generateIntro();
    }
    // Add many more cases here

    return html;
  }

  // TASK: An event handler example that's registered in getEvents()
  handleStart() {
    this.model.startNewGame();
  }
}

export default QuizDisplay;

