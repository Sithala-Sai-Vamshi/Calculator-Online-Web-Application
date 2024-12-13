const display = document.getElementById('display');
const body = document.body;
let currentInput = '';
let currentOperation = null;
let previousInput = '';

document.getElementById('themeToggle').addEventListener('change', function () {
    body.classList.toggle('theme-dark');
});

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        chooseOperation(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

function appendNumber(number) {
    if (display.textContent === '0') {
        display.textContent = number;
    } else {
        display.textContent += number;
    }
    currentInput += number;
}

function chooseOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    display.textContent += ` ${operation} `;
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.textContent = display.textContent.slice(0, -1) || '0';
}

function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    currentOperation = null;
    previousInput = '';
}

function calculate() {
    if (currentOperation == null || currentInput === '') return;
    const computation = eval(`${previousInput} ${currentOperation} ${currentInput}`);
    display.textContent = computation;
    currentInput = computation;
    currentOperation = null;
    previousInput = '';
}
