"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator =
/*#__PURE__*/
function () {
  function Calculator(previousElement, currentElement) {
    _classCallCheck(this, Calculator);

    this.previousElement = previousElement;
    this.currentElement = currentElement;
    this.clear();
  }

  _createClass(Calculator, [{
    key: "clear",
    value: function clear() {
      this.current = '';
      this.previous = '';
      this.operation = undefined;
    }
  }, {
    key: "appendNumber",
    value: function appendNumber(number) {
      if (number === '.' && this.current.includes('.')) return;
      this.current = this.current.toString() + number.toString();
    }
  }, {
    key: "chooseOperation",
    value: function chooseOperation(operation) {
      if (this.current === '') return;

      if (this.previous !== '') {
        this.compute();
      }

      this.operation = operation;
      this.previous = this.current;
      this.current = '';
    }
  }, {
    key: "compute",
    value: function compute() {
      var computation;
      var prev = parseFloat(this.previousOperand);
      var current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;

        case '-':
          computation = prev - current;
          break;

        case '*':
          computation = prev * current;
          break;

        case '÷':
          computation = prev / current;
          break;

        default:
          return;
      }

      this.current = computation;
      this.operation = undefined;
      this.previous = '';
    }
  }, {
    key: "getDisplayNumber",
    value: function getDisplayNumber(number) {
      var stringNumber = number.toString();
      var integerDigits = parseFloat(stringNumber.split('.')[0]);
      var decimalDigits = stringNumber.split('.')[1];
      var integerDisplay;

      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0
        });
      }

      if (decimalDigits != null) {
        return "".concat(integerDisplay, ".").concat(decimalDigits);
      } else {
        return integerDisplay;
      }
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      this.currentElement.innerText = this.getDisplayNumber(this.current);

      if (this.operation != null) {
        this.previousElement.innerText = "".concat(this.getDisplayNumber(this.previous), " ").concat(this.operation);
      } else {
        this.previousElement.innerText = '';
      }
    }
  }]);

  return Calculator;
}();

var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalsButton = document.querySelector('[data-equals]');
var clearButton = document.querySelector('[data-clear]');
var previousElement = document.querySelector('[data-previous]');
var currentElement = document.querySelector('[data-current]');
var calculator = new Calculator(previousElement, currentElement);
numberButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.forEach(function (button) {
  button.addEventListener('click', function () {
    calculator.compute();
    calculator.updateDisplay();
  });
});
clearButton.addEventListener('click', function (button) {
  calculator.clear();
  calculator.updateDisplay();
});