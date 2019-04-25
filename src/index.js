import $ from 'jquery';
import Quiz from './Quiz';
import QuizDisplay from './QuizDisplay';
import QuizStatus from './QuizStatus';

let q, quizDisplay, quizStatus;    // eslint-disable-line no-unused-vars

function main() {
  q = new Quiz();
  quizDisplay = new QuizDisplay(q, '.display');
  quizStatus = new QuizStatus(q, '.status');
}

$(main);
