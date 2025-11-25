const calc = {
    availableOperations: "+*-/",
    opStack: [],
    postfix: [],


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


let expr = ['5','+','6','*','2','-','8'];
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

convertInfixToPostfix(expr, calc.opStack, calc.postfix);

/*
function convertInfixToPostfix(expression) {
    let op = '+*-/';
    expression.forEach(n => {
        if (op.includes(n)) {
            //console.log(`${n} is operation`);
            let opStack = calc.opStack;
            let prevOp = opStack[opStack.length - 1];

            if (currentOpHasLowerOrEqualPrecedence(prevOp, n)) {
                popWhileHigherOrEqualPrecedence(n, opStack);
            }
            else {
                opStack.push(n);
            }
        }

        if (Number(n) || n === '0') {
            //console.log(`${n} is number`);
            calc.postfix.push(n);
        }
    });

    //push remaining operators from opStack to postfix
    while(calc.opStack.length > 0) {
        calc.postfix.push(calc.opStack.pop());
    }
}
*/
//convertInfixToPostfix(expr);

console.log(calc.postfix);

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
    else if(op === '*' || op === '/' || op === '%') {
        precedence = 2;
    }
    else if(op === '^') {
        precedence = 3;
    }
    return precedence;
}

/*
let postfixStr = '';
for(let i = 0; i < calc.postfix.length; i++) {
    postfixStr = postfixStr + ' ' + calc.postfix[i];
}

console.log(postfixStr);
*/

let expr2 = ['5','+','6','*','2','-','8'];
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
        console.log(stack);
    });
    return stack[0];
}

console.log(evaluatePostfix(calc.postfix));