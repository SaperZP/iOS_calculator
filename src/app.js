'use strict';
const resultDisplay = document.querySelector('.secondary-display');
const operationsDisplay = document.querySelector('.primary-display');
const numpad = document.querySelector('.buttons-container');
let buffer = null;
let number = '0';
let prevOperation = null;

function render() {
  let normalisedNumber;

  if (buffer !== null) {
    normalisedNumber = buffer % 1 !== 0 ? buffer.toFixed(2) : buffer.toString();
  } else {
    normalisedNumber = '0';
  }

  resultDisplay.textContent = normalisedNumber;
  operationsDisplay.textContent = number;
}

function evaluate(operator) {
  const num = parseFloat(number);

  if (buffer !== null) {
    switch (prevOperation) {
      case 'division':
        buffer /= num;
        break;
      case 'multiplication':
        buffer *= num;
        break;
      case 'addition':
        buffer += num;
        break;
      case 'subtraction':
        buffer -= num;
        break;
    }
  } else {
    buffer = num;
  }

  prevOperation = operator;
  number = '0';
}

numpad.addEventListener('click', function (event) {
  const target = event.target;
  const buttonType = target.classList;

  if (buttonType.contains('number') && number.length < 7) {
    number = number === '0' && !number.includes('.')
        ? target.textContent
        : number + target.textContent;
  }

  if (buttonType.contains('decimal') && !number.includes('.')) {
    number += '.';
  }

  if (buttonType.contains('zero') && (number !== '0' || number.includes('.'))) {
    number += target.textContent;
  }

  if (buttonType.contains('ac')) {
    number = '0';
    buffer = null;
    prevOperation = null;
  }

  if (buttonType.contains('pm') && number !== '0') {
    number = (-parseFloat(number)).toString();
  }

  if (buttonType.contains('operator')) {
    const operators = document.querySelectorAll('.operator');
    operators.forEach(operator => operator.classList.remove('operator-active'));
    target.classList.add('operator-active');

    evaluate(target.dataset.operation);
  }

  if (buttonType.contains('equal') && buffer !== null && prevOperation !== null) {
    const operators = document.querySelectorAll('.operator');
    operators.forEach(operator => operator.classList.remove('operator-active'));

    evaluate('null');
  }

  if (buttonType.contains('percent') && number !== '0') {
    number = (+number / 100).toString();
    if (+number % 1 !== 0) {
      number = Number(number).toFixed(2);
    }
  }

  render();
})
