class TodoApp{
    constructor(){
        this.tasks = []
        this.taskinput = document.getElementById('taskinput')
        this.addbtn = document.getElementById('addbtn')
        this.tasklist = document.getElementById('tasklist')
    }

    init(){
        this.addbtn.addEventListener('click', () => this.addTask())
        this.loadtasks()
        this.rendertasks()
    }
    addTask(){
        const text = this.taskinput.value
        if(text === '') return
        this.tasks.push({text, done: false})
        this.savetasks()
        this.rendertasks()
        this.taskinput.value = ''
    }
    savetasks (){
        localStorage.setItem('tasks',
        JSON.stringify(this.tasks)
    )}
    loadtasks (){
        const saved = localStorage.getItem('tasks')
        this.tasks = saved ? JSON.parse(saved) : []
    }
    rendertasks (){

    this.tasklist.innerHTML = ''

    this.tasks.forEach(task => {
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
            this.savetasks()
        })

        deletebtn.addEventListener('click', (event) =>{
            event.stopPropagation()
            this.tasks = this.tasks.filter(t => t !== task)
            li.remove()
            this.savetasks()
        })
        this.tasklist.appendChild(li)
    })
}
}

const app = new TodoApp()
app.init()
