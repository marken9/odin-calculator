function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a*b;
}

// check for divide by zero in the future
function divide(a, b) {
    return a/b;
}

function operate(first, second, operator) {
    a = parseInt(first)
    b = parseInt(second)
    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '/':
            if (b === 0) {
                return a;
            } else {
                return divide(a, b);
            }
            break;
    }
}

function bothEmpty(a, b) {
    return a === "" && b === "";
}

function empty(a) {
    return a === "";
}


const leftDisplay = document.querySelector("#left");
const opDisplay = document.querySelector("#op");
const rightDisplay = document.querySelector("#right");

function updateDisplay() {
    leftDisplay.textContent = a;
    opDisplay.textContent = savedOperator;
    rightDisplay.textContent = b;
}


let a = '';
let b = '';
let ans = '';
let savedOperator = '';
let usingA = true;
let newCycle = false;

const digitButtons = document.querySelectorAll('.digit')
digitButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (usingA) {
            if (newCycle) {
                a = ''
                newCycle = false;
            }
            a += btn.textContent;
        } else {
            b += btn.textContent;
        }
        updateDisplay();
    })
});

const operatorButtons = document.querySelectorAll(".operator")
operatorButtons.forEach(btn => {
    btn.addEventListener("click", function () {

        const op = btn.textContent;

        // HANDLE "="
        if (op === "=") {
            if (!a || !b || !savedOperator) return;

            ans = Math.trunc(operate(a, b, savedOperator));
            console.log(ans);

            a = ans;      
            b = "";
            savedOperator = "";
            usingA = true;
            newCycle = true;
            updateDisplay();
            return;
        }

        // handle first number empty
        if (!a) return;

        // IF WE ALREADY HAVE A FULL EXPRESSION → COMPUTE FIRST
        if (a && b && savedOperator) {
            a = Math.trunc(operate(a, b, savedOperator));
            b = "";
            newCycle = true;
        }

        // STORE NEW OPERATOR
        savedOperator = op;
        usingA = false;

        updateDisplay();
    });
});

document.querySelector(".clear")
    .addEventListener("click", () => {
        a = "";
        b = "";
        ans = "";
        savedOperator = "";
        usingA = true;
        newCycle = false;

        updateDisplay();
    });

