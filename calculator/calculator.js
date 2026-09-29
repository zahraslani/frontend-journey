const display = document.getElementById('display')
const buttons = document.querySelector('.buttons')

let currentInput = ''
let previousInput = ''
let operation = null

// Event Listener
buttons.addEventListener('click', (event) => {
  const btn = event.target.closest('button')
  if (!btn) return
  
  const number = btn.dataset.number
  const action = btn.dataset.action
  
  if (number) {
    handleNumber(number)
  } else if (action) {
    handleAction(action)
  }
  
  updateDisplay()
})

// تابع عدد
function handleNumber(num) {
  if (num === '.' && currentInput.includes('.')) return
  currentInput += num
}

// تابع عملیات
function handleAction(action) {
  if (action === 'clear') {
    currentInput = ''
    previousInput = ''
    operation = null
  } else if (action === 'backspace') {
    currentInput = currentInput.slice(0, -1)
  } else if (action === 'equal') {
    calculate()
  } else {
    if (currentInput === '') return
    if (previousInput !== '') calculate()
    operation = action
    previousInput = currentInput
    currentInput = ''
  }
}

// تابع محاسبه
function calculate() {
  if (currentInput === '') return
  if (previousInput === '') return
  
  const curr = parseFloat(currentInput)
  const prev = parseFloat(previousInput)
  let result = 0
  
  if (operation === 'add') result = curr + prev
  else if (operation === 'sub') result = curr - prev
  else if (operation === 'multi') result = curr * prev
  else if (operation === 'div') result = curr / prev
  
  currentInput = result.toString()
  previousInput = ''
  operation = null
}

// تابع نمایش (اینجا تعریف می‌شه!)
function updateDisplay() {
    if (currentInput === '' && previousInput !== ''){
        display.textContent = previousInput + ' ' + getOperatorsymbol(operation) 
    } else if (currentInput !== '' && previousInput !== ''){
        display.textContent = previousInput + ' ' + getOperatorsymbol(operation) + ' ' + currentInput
    } else if (currentInput !== '') {
        display.textContent = currentInput
    } else{
        display.textContent = '0'
    }
}

function getOperatorsymbol (op){
    if (op === 'add') return '+'
    if (op === 'sub') return '-'
    if (op === 'multi') return '*'
    if (op === 'div') return '/'
    if (op === 'equal') return '='
    return ''
}