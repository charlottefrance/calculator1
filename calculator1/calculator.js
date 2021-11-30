const numberButtons = document.querySelectorAll(".number")
const operationButtons = document.querySelectorAll(".operator")
const equalsButton = document.getElementById("#equals")
const clearButton = document.getElementById("#clear")
const previousElement = document.querySelector('[data-previous]')
const currentElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousElement,currentElement);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement
        this.currentElement = currentElement
        this.clear()
    }

    clear() {
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }


    appendNumber(number) {
       if (number === '.' && this.current.includes('.')) return
       this.current = this.current.toString() + number.toString()
    } 

    chooseOperation(operation) {
        if (this.current === '') return
        if (this.previous !== '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
        case '+':
            computation = prev + curr
            break
        case '-':
            computation = prev - curr
            break
        case '*':
            computation = prev * curr
            break
        case '÷':
            computation = prev / curr
            break
        default:
            return
        }
        this.curr = computation
        this.operation = undefined
        this.previous = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
        }
    }

    updateDisplay() {
        this.currentElement.innerText = this.getDisplayNumber(this.current)
        if (this.operation != null) {
            this.previousElement.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}` 
        } else {
            this.previousElement.innerText = ''
        }
    }
    }
