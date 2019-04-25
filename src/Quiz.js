import Model from './lib/Model';

class Quiz extends Model {

  static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    super();

    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false;

    // TASK: Add more props here per the exercise

  }

  // Example method:
  startGame() {
    this.active = true;
  }
}

export default Quiz;
