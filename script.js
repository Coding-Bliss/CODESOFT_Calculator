const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let expression = '';
let canInputNumbers = true; 

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-num');
    const operatorValue = button.getAttribute('data-operator');

    if (value && canInputNumbers) {
      currentInput += value;
      expression += value;
      display.innerText = expression;
    }

    if (operatorValue) {
      if (operatorValue === '+' || operatorValue === '-' || operatorValue === '*' || operatorValue === '/') {
        if (currentInput) { 
          expression += operatorValue;
          display.innerText = expression;
          currentInput = ''; // Reset current input after operator
          canInputNumbers = false; // Disable number input until a new operator is pressed
        }
      }
      if (operatorValue === '.') {
        if (!currentInput.includes('.')) {
          currentInput += operatorValue;
          expression += operatorValue;
          display.innerText = expression;
        }
      }
    }

    if (button.id === 'equals') {
      try {
        const result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
          throw new Error('Invalid Calculation');
        }
        display.innerText = result;
        expression = result.toString(); // Reset expression to result for further calculations
        canInputNumbers = false; // Disable number input after getting result
      } catch (error) {
        display.innerText = 'Error';
        expression = ''; // Reset on error
        canInputNumbers = false; // Disable number input
      }
    }

    if (button.id === 'clear') {
      currentInput = '';
      expression = '';
      display.innerText = '0';
      canInputNumbers = true; // Reset state to allow number input again
    }
  });
});

// Event listener for enabling number input after pressing an operator
const operators = document.querySelectorAll('[data-operator]');
operators.forEach(operator => {
  operator.addEventListener('click', () => {
    if (!canInputNumbers) {
      canInputNumbers = true; 
    }
  });
});
