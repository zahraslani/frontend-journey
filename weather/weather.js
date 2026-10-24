const inputCity = document.getElementById('inputCity')
const suggestions = document.getElementById('suggestions')
const btnSearch = document.getElementById('btnSearch')
const result = document.getElementById('result')

let timer

async function fetchSuggestions(query) {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en`
        const response = await fetch(url)
        if (!response.ok) throw new Error('Request failed')
        const data = await response.json()

        if (!data.results) {
            suggestions.classList.remove('active')
            return
        }

        suggestions.innerHTML = ''

        data.results.forEach(city => {
            const div = document.createElement('div')
            div.className = 'suggestion-item'
            div.textContent = `${city.name}, ${city.country}`

            div.addEventListener('click', () => {
                inputCity.value = city.name
                suggestions.classList.remove('active')
            })
            suggestions.appendChild(div)
        })
        suggestions.classList.add('active')
    } catch (error) {
        // suggestions are optional, so just hide the list
        suggestions.classList.remove('active')
    }
}

function setBackground(desc) {
    const d = desc.toLowerCase()

    if (d.includes('sunny') || d.includes('clear')) {
        document.body.className = 'sunny'
    } else if (d.includes('cloud') || d.includes('overcast')) {
        document.body.className = 'cloudy'
    } else if (d.includes('rain') || d.includes('drizzle')) {
        document.body.className = 'rainy'
    } else if (d.includes('snow')) {
        document.body.className = 'snowy'
    } else {
        document.body.className = ''
    }
}

async function searchWeather() {
    const city = inputCity.value.trim()
    if (city === '') return

    suggestions.classList.remove('active')
    result.textContent = 'Loading...'

    try {
        const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`
        const response = await fetch(url)
        if (!response.ok) throw new Error('City not found')
        const data = await response.json()

        const temp = data.current_condition[0].temp_C
        const desc = data.current_condition[0].weatherDesc[0].value

        setBackground(desc)

        const title = document.createElement('h2')
        title.textContent = `${city} 🌤️`
        const tempP = document.createElement('p')
        tempP.textContent = `Temperature: ${temp}°C 🌡️`
        const descP = document.createElement('p')
        descP.textContent = `Status: ${desc} 📝`

        result.innerHTML = ''
        result.append(title, tempP, descP)
    } catch (error) {
        document.body.className = ''
        result.textContent = 'Could not load the weather. Please check the city name and try again.'
    }
}

inputCity.addEventListener('input', () => {
    clearTimeout(timer)
    const query = inputCity.value.trim()

    if (query.length < 2) {
        suggestions.classList.remove('active')
        return
    }

    timer = setTimeout(() => fetchSuggestions(query), 300)
})

btnSearch.addEventListener('click', searchWeather)

inputCity.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchWeather()
})