const calculatorScreen = document.getElementById('screen');
let currentInput = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

function updateScreen(value) {
    calculatorScreen.value = value;
}

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', function (event) {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    const value = target.value;

    if (target.classList.contains('operator')) {
        handleOperator(value);
    } else if (value === 'all-clear') {
        clear();
    } else if (value === '=') {
        handleEqual();
    } else {
        handleNumber(value);
    }
});

function handleNumber(value) {
    if (operator && result) {
        currentInput = value;
        result = null;
    } else {
        currentInput += value;
    }
    updateScreen(currentInput);
}

function handleOperator(value) {
    if (currentInput === '') {
        return;
    }
    firstOperand = currentInput;
    operator = value;
    currentInput = '';
}

function handleEqual() {
    if (firstOperand === null || operator === null || currentInput === '') {
        return;
    }
    secondOperand = currentInput;
    result = calculate(firstOperand, secondOperand, operator);
    updateScreen(result);
    currentInput = result;
    operator = null;
}

function calculate(firstOperand, secondOperand, operator) {
    let result = '';
    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
    }
    return result;
}

function clear() {
    currentInput = '';
    firstOperand = null;
    secondOperand = null;
    operator = null;
    result = null;
    updateScreen(currentInput);
}
