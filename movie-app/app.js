class MovieApp{
    constructor(){
        this.themeBtn = document.getElementById('themeBtn')
        this.searchForm = document.getElementById('searchForm')
        this.searchInput = document.getElementById('searchInput')
        this.results = document.getElementById('results')
        this.favorites = document.getElementById('favorites')
        this.modal = document.getElementById('modal')
        this.closeModal = document.getElementById('closeModal')
        this.modalBody = document.getElementById('modalBody')
        this.favoritesList = []
    }

    init(){
        this.themeBtn.addEventListener('click', () => this.toggleTheme())
        this.searchForm.addEventListener('submit', (e) => this.handleSearch(e))
        this.closeModal.addEventListener('click', () => this.closeModalFn())
        this.loadTheme()
        this.loadFavorites()
    }
    toggleTheme(){
        const current = document.documentElement.getAttribute('data-theme')
        if(current === 'dark'){
            document.documentElement.removeAttribute('data-theme')
            this.themeBtn.textContent = "🌙"
            localStorage.setItem('theme', 'light')
        } else {
            document.documentElement.setAttribute('data-theme', 'dark')
            this.themeBtn.textContent = "☀️"
            localStorage.setItem('theme', 'dark')
        }
    }
    //پیش فرض در زمان لود صفحه سفید هست اما اینجا میگیم اگه لود شد چیزی که قبلا بوده رو برگردون
    loadTheme(){
        const saved = localStorage.getItem('theme')
        if(saved === 'dark'){
            document.documentElement.setAttribute('data-theme', 'dark')
            this.themeBtn.textContent = "☀️" 
        }
    }
    async handleSearch(e){
        e.preventDefault() //جلوگیری از رفتار گیش فرض مرورگر
        const query = this.searchInput.value.trim()
        if ( query === '') return
        try{
            const url = `http://www.omdbapi.com/?apikey=1b2f9ae4&s=${query}`
            const response = await fetch(url)
            const data =await response.json()
            console.log(data)
            if (data.Response ===  'True'){
                this.renderResults(data.Search)
            }else{
                this.results.innerHTML = '<p>not found</p>'
            }
        } catch(error){
            console.log('خطا:', error)
        }
    }
    renderResults(movies) { 

        this.results.innerHTML = ''

        movies.forEach(movie => {
            const card = document.createElement('div')
            card.className = 'movie-card'
            card.addEventListener('click', () =>
            this.openModal(movie))
            const poster = document.createElement('img')
            poster.src = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'
            poster.alt = movie.Title
            const title = document.createElement('h3')
            title.textContent = movie.Title
            const year = document.createElement('p')
            year.textContent = movie.Year
            const favBtn = document.createElement('button')
            favBtn.textContent = '❤️'
            favBtn.className = 'fav-btn'
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation()// متوقف میکنه پخش شدن رویداد به عناصر والدرو
                this.addToFavorites(movie)
            })

            card.appendChild(poster)
            card.appendChild(title)
            card.appendChild(year)
            card.appendChild(favBtn)

            this.results.appendChild(card)
        });
    }
    addToFavorites(movie) {
        const exists = this.favoritesList.find(f => f.imdbID === movie.imdbID)
        if (exists) return

        this.favoritesList.push(movie)
        this.saveFavorites()
        this.renderFavorites()
    }
    removeFromFavorites(id) {
        this.favoritesList = this.favoritesList.filter (f => f.imdbID !== id)
        this.saveFavorites()
        this.renderFavorites()
    }
    renderFavorites() {
        this.favorites.innerHTML = ''
        if (this.favoritesList.length === 0){
            this.favorites.innerHTML = '<p>Nothing ...</p>' 
            return
        }
        this.favoritesList.forEach(movie =>{
            
            const card = document.createElement('div')
            card.className = 'movie-card'
            const poster = document.createElement('img')
            poster.src = movie.Poster !== 'N/A' 
            ? movie.Poster 
            : 'https://via.placeholder.com/200x300'
            poster.alt = movie.Title
            const title = document.createElement('h3')
            title.textContent = movie.Title
            const year = document.createElement('p')
            year.textContent = movie.Year
            const delBtn = document.createElement('button')
            delBtn.textContent = '❌'
            delBtn.className = 'del-btn'
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation()
                this.removeFromFavorites(movie.imdbID)
            })

            card.appendChild(poster)
            card.appendChild(title)
            card.appendChild(year)
            card.appendChild(delBtn)

            card.addEventListener('click', () =>
            this.openModal(movie))

            this.favorites.appendChild(card)
        })
    }
    saveFavorites() {
        localStorage.setItem('favorites',
            JSON.stringify(this.favoritesList)
        )
    }
    loadFavorites() {
        const saved = localStorage.getItem('favorites')
        this.favoritesList = saved ? JSON.parse(saved) : []
        this.renderFavorites()
    }
    async openModal(movie) {
        try{
            const url = `http://www.omdbapi.com/?apikey=1b2f9ae4&i=${movie.imdbID}`
            const response = await fetch(url)
            const data =await response.json()

            this.modalBody.innerHTML = `
            <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/200x300'}" alt="${data.Title}">
            <h2>${data.Title}</h2>
            <p><strong>Year:</strong> ${data.Year}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>imdbRating:</strong> ⭐ ${data.imdbRating}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Runtime:</strong> ${data.Runtime}</p>`

            this.modal.classList.add('active')
        } catch(error){
            console.log('خطا:', error)
        }

    }
    closeModalFn() {
        this.modal.classList.remove('active')
    }
}

const app = new MovieApp()
app.init()