const noteTitle = document.getElementById('noteTitle')
const noteContent = document.getElementById('noteContent')
const addBtn = document.getElementById('addBtn')
const noteList = document.getElementById('noteList')

let notes = []

function addNote(){

    const title = noteTitle.value
    const content = noteContent.value

    if(title === '' || content === '') return

    notes.push({title, content})
    renderNotes()
    saveNotes()

    noteTitle.value =''
    noteContent.value = ''
}

function renderNotes(){

    noteList.innerHTML = ''

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div')
        noteDiv.className = 'note'
        const contentDiv = document.createElement('div')
        contentDiv.className = 'note-content'
        const titleDiv = document.createElement('div')
        titleDiv.className = 'note-title'
        titleDiv.textContent = note.title
        const textDiv = document.createElement('div')
        textDiv.className = 'note-text'
        textDiv.textContent = note.content
        
        contentDiv.appendChild(titleDiv)
        contentDiv.appendChild(textDiv)

        const delBtn = document.createElement('button')
        delBtn.textContent = 'Delete'
        delBtn.addEventListener('click', ()=>{
            notes.splice(index, 1)
            renderNotes()
            saveNotes()
        })

        noteDiv.appendChild(contentDiv)
        noteDiv.appendChild(delBtn)

        noteList.appendChild(noteDiv)
    })
}

function saveNotes(){

    localStorage.setItem('notes', 
        JSON.stringify(notes)
    )
}

function loadNotes(){
    const saved = localStorage.getItem('notes')
    return saved ? JSON.parse (saved) : []
}

addBtn.addEventListener('click', addNote)

    notes = loadNotes()
    renderNotes()