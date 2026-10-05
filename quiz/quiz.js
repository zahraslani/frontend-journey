const questionEl = document.getElementById('question')
const answersEl = document.getElementById('answers')
const nextBtn =  document.getElementById('nextBtn')
const resultEl = document.getElementById('result')

const questions = [ 
    {question : "کدام یکی متد آرایه در js نیست؟", answers : ["map", "filter", "reduce", "paint"], correct: 3},
    {question : "کدام یکی برای ذخیره‌سازی در مرورگر است؟", answers : ["localStorage", "fetch", "async", "await"], correct: 0},
    {question: "کدام یکی متد رشته (String) در JS است؟", answers : ["toUpperCase", "map", "filter", "reduce"], correct: 0},
    {question : "کدام یکی برای درخواست به سرور استفاده می‌شه؟", answers : ["fetch", "map", "push", "split"], correct: 0},
    {question: "کدام یکی روش تعریف متغیر در JS نیست؟", answers : ["let", "const", "var", "def"], correct: 3}
]

let currentQuestion = 0
let score = 0

function showQuestion (){

    const q = questions[currentQuestion]

    questionEl.textContent = q.question
    answersEl.innerHTML = ''
    nextBtn.disabled = true

    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button')
        btn.textContent = answer
        btn.addEventListener('click', ()=>
        selectAnswer(index, btn))
        answersEl.appendChild(btn)
    })
}

function selectAnswer (index, btn){

    const q = questions[currentQuestion]

    const allbtn = answersEl.querySelectorAll('button')
    allbtn.forEach(b => b.disabled = true)

    if(index === q.correct){
        btn.classList.add('correct')
        score++
    } else {
        btn.classList.add('wrong')
        allbtn[q.correct].classList.add('correct')
    }

    nextBtn.disabled = false
}

function nextQuestion (){

    currentQuestion++

    if(currentQuestion < questions.length){
        showQuestion()
    } else {
        showResult()
    }
}

function showResult (){

    questionEl.textContent = 'finish'
    answersEl.innerHTML = ''
    nextBtn.style.display = 'none'
    resultEl.textContent = `score: ${score} from ${questions.length}`

}

nextBtn.addEventListener('click', nextQuestion)

showQuestion()