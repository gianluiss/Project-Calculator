const calc = {
    availableOperations: '+,-,÷,x',
    postfix: [],
    opStack: [],

    add: function(a, b) { return a + b },
    subtract: function(a, b) { return a - b },
    multiply: function(a, b) { return a * b },
    divide: function(a, b) { return a / b},

    operate: function(operator, a, b) {
        switch(operator) {
            case '+': 
                return this.add(a, b);
                break;
            case '-': 
                return this.subtract(a, b);
                break;
            case 'x': 
                return this.multiply(a, b);
                break;
            case '÷': 
                return this.divide(a, b);
                break;
        }
    }
}

/*
let exprTest = ['5','+','7','-','2','*','2'];
convertInfixToPostfix(exprTest, calc.opStack, calc.postfix);
console.log(calc.postfix);
*/

// ------------------------------------
// DOM ELEMENTS
// ------------------------------------
const buttons = document.querySelectorAll('.button');
const expression = document.querySelector('#expression');
const answer = document.querySelector('#answer');


// ------------------------------------
// STATE
// ------------------------------------
let expr = '0';
let ans = '';
let ansPreview = '';
let exprArr = [];

// ------------------------------------
// UPDATE UI
// ------------------------------------
function updateUI() {
    if(Number.isNaN(ansPreview) && !calc.availableOperations.includes(exprArr[exprArr.length-2])) {
        expression.style.color = 'rgb(252, 170, 170)';
        expression.textContent = expr;
        answer.textContent = '';
    }
    else {
        expression.style.color = 'whitesmoke';
        expression.textContent = expr;
        answer.textContent = !Number.isNaN(ansPreview) ? ansPreview : '';
    }
    /*
    expression.textContent = expr;
    //answer.textContent = !Number.isNaN(ansPreview) ? ansPreview : '';
    */
}

// ------------------------------------
// INIT
// ------------------------------------
function init() {
    setupEvents();
    updateUI(); //will alter everything so that I store everything first instead of modifying the UI immediately.
}

init();

// ------------------------------------
// EVENT LISTENERS
// ------------------------------------
function setupEvents() {
    buttons.forEach( (btn) => {
        btn.addEventListener('click', handleButtonClick)
    });
}

// ------------------------------------
// HANDLERS (Events  + UI Logic)
// ------------------------------------
function handleButtonClick(event) {
    const btn = event.target;
    let currentIndex = exprArr.length-1;
    //console.log(exprArr);
    //console.log(btn.textContent); //for debug
    //console.log(expr.split(" ")); //WILL USE THIS FOR COMPUTATION

    if(btn.id === "all-clear") {
        expr = "0";
        ans = "";
    }

    if(btn.id === "clear") {
        if(expr.at(length-1) === ' ') {
            expr = expr.slice(0, expr.length - 3);
        }
        else {
            expr = expr.slice(0, expr.length - 1);
        }

        if(expr === "") {
            expr = "0";
            ans = "";
        }
    }

    //console.log(exprArr);
    if(btn.id === 'decimal' && !exprArr[currentIndex].includes('.')) {
        expr += '.';

        //NOTE: BUGS TO WATCH OUT FOR 
        //e.g 5 + . SHOULD OUTPUT ERROR
    }

    const isSpace = expr[expr.length-1] === ' ';
    if(btn.className === "button operation" && !isSpace) {
        switch(btn.textContent) {
            case '+':
                expr += ' + ';
                break;
            case '-':
                expr += ' - ';
                break;
            case '÷':
                expr += ' ÷ ';
                break;
            case 'x':
                expr += ' x ';
                break;
        }
    }

    if(btn.className === "button number") {
        if(expr === "0") 
            expr = "";

        switch(btn.textContent) {
            case '0': expr += '0'; break;
            case '1': expr += '1'; break;
            case '2': expr += '2'; break;
            case '3': expr += '3'; break;
            case '4': expr += '4'; break;
            case '5': expr += '5'; break;
            case '6': expr += '6'; break;
            case '7': expr += '7'; break;
            case '8': expr += '8'; break;
            case '9': expr += '9'; break;
        }
    }

    exprArr = expr.split(' ');

    if(btn.id === 'equals') {
        convertInfixToPostfix(exprArr, calc.opStack, calc.postfix);
        ans = evaluatePostfix(calc.postfix);
        expr = String(ans).slice();
        calc.postfix = [];

        ansPreview = NaN;
        exprArr = expr.split(' ');
        updateUI();
        //console.log(`AnsPrev: ${ansPreview} | Ans: ${ans}`);
    }
    else {
        //for answer preview without pressing equals
        convertInfixToPostfix(exprArr, calc.opStack, calc.postfix);
        ansPreview = evaluatePostfix(calc.postfix);
        //expr = String(ans).slice();
        calc.postfix = [];

        //console.log(`AnsPrev: ${ansPreview} | Ans: ${ans}`);
        updateUI();
    }
}


// ------------------------------------
// PURE LOGIC 
// ------------------------------------
function evaluatePostfix(postfix) {
    let stack = [];
    postfix.forEach( value => {
        if(calc.availableOperations.includes(value)) {
            let op = value;
            let rightNum = +stack.pop();
            let leftNum = +stack.pop();
            stack.push(calc.operate(op, leftNum, rightNum));
        }
        else {
            stack.push(value);
        }
        //console.log(stack[0]);
    });
    return stack[0];
}

function convertInfixToPostfix(expression, opStack, postfix) {
    let op = calc.availableOperations;
    expression.forEach(n => {
        if (op.includes(n)) {
            let prevOp = opStack[opStack.length - 1];

            if (currentOpHasLowerOrEqualPrecedence(prevOp, n)) {
                popWhileHigherOrEqualPrecedence(n, opStack);
            }
            else {
                opStack.push(n);
            }
        }

        if (Number(n) || n === '0') {
            postfix.push(n);
        }
    });

    //push remaining operators from opStack to postfix
    while(calc.opStack.length > 0) {
        postfix.push(opStack.pop());
    }
}

function popWhileHigherOrEqualPrecedence(op, opStack) {
    while( currentOpHasLowerOrEqualPrecedence( opStack[opStack.length-1], op) ) {
        calc.postfix.push( opStack.pop() );
    }
    opStack.push(op) //push current op at the end
}

function currentOpHasLowerOrEqualPrecedence(prevOp, currOp) {
    return getPrecedence(prevOp) > getPrecedence(currOp) || getPrecedence(prevOp) === getPrecedence(currOp);
}

function getPrecedence(op) {
    let precedence;
    if(op === '+' || op === '-') {
        precedence = 1;
    }
    else if(op === 'x' || op === '÷' || op === '%') {
        precedence = 2;
    }
    else if(op === '^') {
        precedence = 3;
    }
    return precedence;
}