import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`
    let progress;
    let highScore = 0;
    if (Math.max(this.model.scoreHistory) > 0){
      highScore = Math.max(...this.model.scoreHistory);
    }

    if (this.model.asked.length === 0){
      progress = 'Inactive';
    } else {
      progress = `${this.model.asked.length} out of 5`;
    }

    return `
      <div class="current-status">
      <span class="current-score">Score: ${this.model.score}</span>
      <span class="current-highscore">High Score: ${highScore}</span>
      <span class="current-progress">Progress: ${progress}</span>
      </div>
    `;
  }
}

export default QuizStatus;