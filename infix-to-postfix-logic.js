const calc = {
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

console.log(calc.opStack.length);

let expr = ['5','+','6','*','2','-','8'];
let op = '+-*/';

function convertInfixToPostfix(expression) {
    expr.forEach(n => {
        if (op.includes(n)) {
            //console.log(`${n} is operation`);
            let opStack = calc.opStack;
            let prevOp = opStack[opStack.length - 1];

            if (opStack.length === 0) {
                opStack.push(n);
            }
            else if (currentOpHasLowerOrEqualPrecedence(prevOp, n)) {
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
}

convertInfixToPostfix(expr);

function popWhileHigherOrEqualPrecedence(op, opStack) {
    for(let i = opStack.length-1; i >= 0; i--) {
        if( currentOpHasLowerOrEqualPrecedence(opStack[i], op) )
            calc.postfix.push( opStack.pop() );
    }
    opStack.push(op) //push current op at the end
}

//console.log(calc.opStack);
for(let i = calc.opStack.length-1; i >= 0; i--) {
    calc.postfix.push(calc.opStack.pop());
}
console.log(calc.postfix);

//console.log(currentOpHasLowerOrEqualPrecedence('+','*'));
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

let postfixStr = '';
for(let i = 0; i < calc.postfix.length; i++) {
    postfixStr = postfixStr + ' ' + calc.postfix[i];
}

console.log(postfixStr);