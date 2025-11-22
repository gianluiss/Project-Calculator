let calculator = {
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

// ------------------------------------
// INIT
// ------------------------------------
function init() {
    setupEvents();
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
    //console.log(btn.id); //for debug

    console.log(expression.textContent.split(" ")); //WILL USE THIS FOR COMPUTATION


    if(btn.id === "all-clear") {
        expression.textContent = "0";
    }

    if(btn.id === "clear") {
        expression.textContent = expression.textContent.slice(0, expression.textContent.length-1);
        if(expression.textContent === "")
            expression.textContent = "0";
    }

    const isSpace = expression.textContent.at(expression.textContent.length-1) === ' ';
    if(btn.className === "button operation" && !isSpace) {
        switch(btn.textContent) {
            case '+':
                expression.textContent += ' + ';
                break;
            case '-':
                expression.textContent += ' - ';
                break;
            case '÷':
                expression.textContent += ' ÷ ';
                break;
            case 'x':
                expression.textContent += ' x ';
                break;
        }
    }

    if(btn.className === "button number") {
        if(expression.textContent === "0") 
            expression.textContent = "";

        switch(btn.textContent) {
            case '0': expression.textContent += '0'; break;
            case '1': expression.textContent += '1'; break;
            case '2': expression.textContent += '2'; break;
            case '3': expression.textContent += '3'; break;
            case '4': expression.textContent += '4'; break;
            case '5': expression.textContent += '5'; break;
            case '6': expression.textContent += '6'; break;
            case '7': expression.textContent += '7'; break;
            case '8': expression.textContent += '8'; break;
            case '9': expression.textContent += '9'; break;
        }
    }
}



// ------------------------------------
// PURE LOGIC 
// ------------------------------------