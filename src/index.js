/* global Quiz, QuizDisplay, QuizStatus */
import $ from 'jquery';

let q, quizDisplay, quizStatus;    // eslint-disable-line no-unused-vars

function main() {
  q = new Quiz();
  quizDisplay = new QuizDisplay(q, '.display');
  quizStatus = new QuizStatus(q, '.status');
}

$(main);
