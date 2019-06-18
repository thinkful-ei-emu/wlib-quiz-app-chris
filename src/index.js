import $ from 'jquery';
import Quiz from './Quiz';
import QuizDisplay from './QuizDisplay';
import QuizStatus from './QuizStatus';

function main() {
  const quiz = new Quiz();
  const quizDisplay = new QuizDisplay(quiz, '.display');
  const quizStatus = new QuizStatus(quiz, '.status');
  window.quiz = quiz;  // adding `quiz` to `window`, so you can examine it in console
  window.quizDisplay = quizDisplay;
  window.quizStatus = quizStatus;

}

$(main);

