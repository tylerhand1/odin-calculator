/* Display */
const calculationDisplay = document.querySelector('.calculation');
const resultDisplay = document.querySelector('.result');
/* Button variables */
// Top row
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
// Main operators +, -, *, /
const operatorBtns = [...document.querySelectorAll('.operator')];
// equal operator
const equalBtn = document.querySelector('#equal')
// Dot operator
const dotbtn = document.querySelector('#dot')
// Numbers
const numberBtns = [...document.querySelectorAll('.number')];

/* Calculation variables */
let a = 0, b = 0;
let operator = add;
let operatorSet = false;
let onFirstNum = true;
let secondNumSet = false;
let onFirstDigit = true;
let atLeastOnceCalculated = false;
let decimal = false;
let decimalCount = 0;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate() {
    if(operatorSet && (secondNumSet || atLeastOnceCalculated)) {
        let result = operator(a, b);
        console.log(`Result is ${result}`);
        calculationDisplay.textContent = `${calculationDisplay.textContent} ${b}`;
        result = Number.parseFloat(result.toFixed(10));
        if(result > 1e12) {
            result = result.toExponential();
        }
        resultDisplay.textContent = result;
        resetNums();
        a = result;
        atLeastOnceCalculated = true;
        operatorSet = false;
    }
}

function clearDisplay() {
    console.log('Display cleared');
    calculationDisplay.textContent = '';
    resultDisplay.textContent = '0';
    resetNums();
    atLeastOnceCalculated = false;
    decimal = false;
    decimalCount = 0;
}

function deleteNum() {
    console.log('Delete pressed');
    let num;
    if(resultDisplay.textContent.length <= 1) { /* edge case */
        num = 0;
        resultDisplay.textContent = '';
    } else {
        if(decimal) {
            if(decimalCount === 1) {
                resultDisplay.textContent = `${Math.floor(Number.parseFloat(resultDisplay.textContent))}`;
                num = Number.parseFloat(resultDisplay.textContent);
            } else {
                num = Number.parseFloat(`${resultDisplay.textContent.slice(0, resultDisplay.textContent.length - 1)}`);
                resultDisplay.textContent = num
            }
            decimalCount--;
            
        } else {
            num = Number.parseFloat(`${resultDisplay.textContent.slice(0, resultDisplay.textContent.length - 1)}`);
            resultDisplay.textContent = num
        }
        if(decimalCount === 0) {
            decimal = false;
        }
    }
    if(onFirstNum) {
        a = num;
    } else {
        b = num;
    }
}

function setOperator(e) {
    let symbol;
    switch(e.target.id) {
        case 'add':
            operator = add;
            symbol = '+';
            break;
        case 'subtract':
            operator = subtract;
            symbol = '-';
            break;
        case 'multiply':
            operator = multiply;
            symbol = 'x';
            break;
        case 'divide':
            operator = divide;
            symbol = '÷';
            break;
    }
    operatorSet = true;
    onFirstNum = false;
    decimal = false;
    decimalCount = 0;
    onFirstDigit = true;
    console.log(`Operator set to ${operator}`);

    // Change calculation display
    calculationDisplay.textContent = `${a} ${symbol}`;
}

function addNumToDisplay(e) {
    console.log(`${e.target.textContent} added to display`);
    if(onFirstNum) {
        if(decimal) {
            if(decimalCount === 0) {
                a = Number.parseFloat(`${a}.${e.target.textContent}`);
                console.log(a)
                if(a === Math.floor(a)) {
                    resultDisplay.textContent = `${a}.${e.target.textContent}`;
                } else {
                    resultDisplay.textContent = a;
                }
            } else {
                console.log(a)
                a = Number.parseFloat(`${a}${e.target.textContent}`);
                if(a === Math.floor(a)) {
                    console.log('here')
                    resultDisplay.textContent = `${a}${e.target.textContent}`;
                } else {
                    resultDisplay.textContent = a;
                }
            }
            decimalCount++;
        } else {
            a = Number.parseFloat(`${a}${e.target.textContent}`);
            resultDisplay.textContent = a;
        }
    } else {
        if(decimal) {
            if(decimalCount === 0) {
                b = Number.parseFloat(`${b}.${e.target.textContent}`);
            } else {
                b = Number.parseFloat(`${b}${e.target.textContent}`);
            }
            decimalCount++;
        } else {
            if(onFirstDigit) {
                b = Number.parseFloat(`${e.target.textContent}`);
                onFirstDigit = false;
            } else {
                b = Number.parseFloat(`${b}${e.target.textContent}`);
            }
        }
        secondNumSet = true;
        resultDisplay.textContent = b;
    }
    
}

function addDot() {
    if(!decimal) {
        decimal = true;
        resultDisplay.textContent = `${resultDisplay.textContent}.`;
        if(onFirstNum) {
            a = Number.parseFloat(`${resultDisplay.textContent}`);
        } else {
            if(onFirstDigit) {
                b = 0
            } else {
                b = Number.parseFloat(`${resultDisplay.textContent}`);
            }
            resultDisplay.textContent = `${b}.`;
        }
    }
}

function resetNums() {
    a = b = 0;
    onFirstNum = true;
    secondNumSet = false;
    onFirstDigit = true;
}

/* Create event listeners */
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteNum)
operatorBtns.forEach(operatorBtn => operatorBtn.addEventListener('click', setOperator));
numberBtns.forEach(numberBtn => numberBtn.addEventListener('click', addNumToDisplay));
equalBtn.addEventListener('click', operate);
dotbtn.addEventListener('click', addDot);

clearDisplay();