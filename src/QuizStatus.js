import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`
    let progress;
    const {score, highScore} = this.model;
    if (this.model.asked.length === 0){
      progress = 'Inactive';
    } else {
      progress = `${this.model.asked.length} out of 5`;
    }

    return `
      <div class="current-status">
      <span class="status-item current-score">Score: ${score}</span>
      <span class="status-item current-highscore">High Score: ${highScore}</span>
      <span class="status-item current-progress">Progress: ${progress}</span>
      </div>
    `;
  }
}

export default QuizStatus;