const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
const clearButton = document.getElementById("clear");
const delButton = document.getElementById("delete");
const equalButton = document.getElementById("equal");
const previousOperandText = document.getElementById("previous-operand");
const currentOperandText = document.getElementById("current-operand");


class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    chooseNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') return;
        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if (this.currentOperand !== '') {
            this.compute();
        }
        if (this.operation !== undefined)
            return;
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) 
            return;
        let res;
        switch(this.operation) {
            case '÷':
                res = prev / curr;
                break;
            case '*':
                res = prev * curr;
                break;
            case '+':
                res = prev + curr;
                break;
            case '-':
                res = prev - curr;
                break;
            default:
                break;
        }
        this.previousOperand = "";
        this.currentOperand = res.toString();
        this.operation = undefined;
    }

    updateDisplay() {
        if (this.operation !== undefined) {
            this.previousOperandText.textContent = this.previousOperand + this.operation;
        } else {
            this.previousOperandText.textContent = this.previousOperand;
        }
        this.currentOperandText.textContent = this.currentOperand;
    }
}


let calculator = new Calculator(previousOperandText, currentOperandText);

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

delButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        calculator.chooseNumber(numberButton.textContent);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(operationButton => {
    operationButton.addEventListener("click", ()=> {
        calculator.chooseOperation(operationButton.textContent);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})