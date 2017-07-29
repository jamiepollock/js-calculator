const calculator = document.querySelector('form.calculator');
const output = calculator.querySelector('.output');
const numberButtons = calculator.querySelectorAll(".numbers > button");
const controlButtons = calculator.querySelectorAll(".controls > button");
const resetButtons = calculator.querySelectorAll(".resets > button");
const history = calculator.querySelector('.history');

let calculatorMemory = [];

function calculate(memory) {
    let operation = '';

    return memory.reduce((total, item) => {
        if (isOperation(item)) {
            operation = item;
            return total;
        } else if(isNaN(item) == false) {
            const value = parseFloat(item);
            
            switch (operation)
            {
                case "+":
                    return total + value;
                case "/":
                    return total / value;
                case "-":
                    return total - value;
                case "x":
                    return total * value;                     
                default:
                    return value;
            }
        }
    }, 0);
}

function isOperation(value) {
    return value.match(/^(\+|x|\/|-)$/i);
}

function handleNumbers() {
    if (this.innerText === '.' && output.value.includes(this.innerText)) {
        return;
    }
  
    if (this.innerText === '-/+') {  
        if(output.value !== "0") {
            const newValue = output.value.startsWith('-') ? output.value.substr(1) : '-' + output.value;
        
            output.value = newValue;
        }
  
    } else {
        const newValue = output.value === "0" && this.innerText !== '.' ? this.innerText : output.value + this.innerText;

        output.value = newValue;
    }
}

function handleControls() {
    const input = this.dataset.operation ? this.dataset.operation : this.innerText;
    calculatorMemory.push(output.value);

    if (input === '=') {
        output.value = calculate(calculatorMemory);
        calculatorMemory = [];
    } else {
        calculatorMemory.push(input);
        calculator.reset();
    }
}

function handleResets() {
    if (this.classList.contains('backspace')) {
        const newValue = output.value.substr(0, output.value.length - 1) || 0;
        output.value = newValue;
    } else if(this.classList.contains('clear-all')) {
        calculatorMemory = [];
    }
}

numberButtons.forEach(button => button.addEventListener('click', handleNumbers));
controlButtons.forEach(button => button.addEventListener('click', handleControls));
resetButtons.forEach(button => button.addEventListener('click', handleResets));

calculator.addEventListener('submit', (e) => {
     e.preventDefault();
});
