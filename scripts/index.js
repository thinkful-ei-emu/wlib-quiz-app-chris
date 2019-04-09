/* global Quiz, QuizDisplay, QuizStatus */

let q, quizDisplay, quizStatus;    // eslint-disable-line no-unused-vars

function main() {
  q = new Quiz();
  new QuizDisplay(q, '.display');
  new QuizStatus(q, '.status');
}

$(main);
