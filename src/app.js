'use strict';
const resultDisplay = document.querySelector('.secondary-display');
const operationsDisplay = document.querySelector('.primary-display');
const numpad = document.querySelector('.buttons-container');
let buffer = null;
let number = '0';
let prevOperation = null;

function renderer() {
  if (buffer) {
    resultDisplay.textContent = buffer;
  } else {
    resultDisplay.textContent = '0';
  }
  operationsDisplay.textContent = number;
}

function evaluator(operator) {

  if (buffer && prevOperation) {
    switch (prevOperation) {
      case 'division':
        buffer = +buffer / +number;
        break;

      case 'multiplication':
        buffer = +buffer * +number;
        break;

      case 'addition':
        buffer = +buffer + +number;
        break;

      case 'subtraction':
        buffer = +buffer - +number;
        break;
    }

  } else {
    buffer = number;
  }

  prevOperation = operator;
  number = '0';
}

numpad.addEventListener('click', function (event) {
  const buttonType = event.target.classList;

  if (buttonType.contains('number') && number.length < 7) {
    number = Number(number) === 0 && !number.includes('.')
        ? event.target.textContent
        : `${number + event.target.textContent}`;
  }

  if (buttonType.contains('decimal') && !number.includes('.')) {
    number += '.';
  }

  if (buttonType.contains('zero') && Number(number) !== 0 || buttonType.contains('zero') && number.includes('.')) {
    number += event.target.textContent
  }

  if (buttonType.contains('ac')) {
    number = '0';
    buffer = null;
    prevOperation = null;
  }

  if (buttonType.contains('pm') && Number(number) !== 0) {
    number = -+number.toString();
  }

  if (buttonType.contains('division')) evaluator('division');
  if (buttonType.contains('multiplication')) evaluator('multiplication');
  if (buttonType.contains('addition')) evaluator('addition');
  if (buttonType.contains('subtraction')) evaluator('subtraction');
  if (buttonType.contains('equal') && number && buffer && prevOperation) evaluator('null');

  renderer();
})
