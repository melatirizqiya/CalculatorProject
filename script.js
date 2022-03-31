class Calculator {
    constructor(previousoperationTextElement, currentoperationTextElement) {
        this.previousoperationTextElement = previousoperationTextElement
        this.currentoperationTextElement = currentoperationTextElement
        this.clear()
    }

    clear() {
        this.currentoperation = ''
        this.previousoperation = ''
        this.calculation = undefined
    }

    delete() {
        this.currentoperation = this.currentoperation.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentoperation.includes('.')) return
        this.currentoperation = this.currentoperation.toString() + number.toString() 
    }

    chooseCalculation(operation) {
        if (this.currentoperation === '') return
        if (this.previousoperation !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousoperation = this.currentoperation
        this.currentoperation = ''

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousoperation)
        const current = parseFloat(this.currentoperation)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentoperation = computation
        this.operation = undefined
        this.previousoperation = ''
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

    updateScreen() {
        this.currentoperationTextElement.innerText = 
            this.getDisplayNumber(this.currentoperation)
        if (this.operation != null) {
            this.previousoperationTextElement.innerText = 
                `${this.getDisplayNumber(this.previousoperation)} ${this.operation}`
        } else {
            this.previousoperationTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const calculationButtons = document.querySelectorAll('[data-calc]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-allclear]')
const previousoperationTextElement = document.querySelector('[data-prevop]')
const currentoperationTextElement = document.querySelector('[data-currop]')

const calculator = new Calculator(previousoperationTextElement, currentoperationTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateScreen()
    })
})

calculationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseCalculation(button.innerText)
        calculator.updateScreen()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateScreen()
})

allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateScreen()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateScreen()
})
