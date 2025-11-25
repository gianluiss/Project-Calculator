const calculator = {
    numberStack: [],
    operatorStack: [],

    add: function(a, b) { return a + b },
    subtract: function(a, b) { return a - b },
    multiply: function(a, b) { return a * b },
    divide: function(a, b) { return a / b },

    operate: function(operator, a, b) {
        switch(operator) {
            case '+': 
                return this.add(a, b);
                break;
            case '-': 
                return this.subtract(a, b);
                break;
            case '*': 
                return this.multiply(a, b);
                break;
            case '/': 
                return this.divide(a, b);
                break;
        }
    }
}


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
let ans = '0';
let exprArr = [];

// ------------------------------------
// UPDATE UI
// ------------------------------------
function updateUI() {
    expression.textContent = expr;   
    answer.textContent = ans;
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
        }
    }

    //console.log(exprArr);
    if(btn.id === 'decimal' && !exprArr[currentIndex].includes('.')) {
        expr += '.';

        //NOTE: BUGS TO WATCH OUT FOR 
        //e.g 5 + . SHOULD OUTPUT ERROR
    }

    const isSpace = expr.at(expr.length-1) === ' ';
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

    if(btn.id === 'equals') {

    }

    exprArr = expr.split(' ');
    //console.log(exprArr);
    updateUI();
}

console.log(Number('5 + 2'));


// ------------------------------------
// PURE LOGIC 
// ------------------------------------