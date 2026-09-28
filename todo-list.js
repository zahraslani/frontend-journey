const taskinput = document.getElementById('taskinput')
const addbtn = document.getElementById('addbtn')
const tasklist = document.getElementById('tasklist')

let tasks = []

function savetasks (){
    localStorage.setItem('tasks',
        JSON.stringify(tasks)
    )
}

function loadtasks (){
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
}

function rendertasks (){

    tasklist.innerHTML = ''

    tasks.forEach(task => {
        const li = document.createElement('li')
        const span = document.createElement('span')
        span.textContent = task.text
        li.appendChild(span)

        if(task.done){
            li.classList.add('done')
        }

        const deletebtn = document.createElement('button')
        deletebtn.textContent = 'delete'
        deletebtn.classList.add('deletebtn')
        li.appendChild(deletebtn)

        li.addEventListener('click', () => {
            task.done = !task.done
            li.classList.toggle('done')
            savetasks()
        })

        deletebtn.addEventListener('click', (event) =>{
            event.stopPropagation()
            tasks = tasks.filter(t => t !== task)
            li.remove()
            savetasks()
        })

        tasklist.appendChild(li)
    })
}

addbtn.addEventListener('click', () =>{
    const tasktext = taskinput.value
    if (tasktext === '') return
    tasks.push({text:tasktext, done:false})
    savetasks()
    rendertasks()
    taskinput.value=''
})

tasks = loadtasks()
rendertasks()