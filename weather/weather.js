const inputCity = document.getElementById('inputCity')
const suggestions =document.getElementById('suggestions')
const btnSearch = document.getElementById('btnSearch')
const result =document.getElementById('result')

inputCity.addEventListener('input',
    async() => {
        const query = inputCity.value
        console.log('Query:', query)

        if(query.length < 2){
            suggestions.classList.remove('active')
            return
        }

        try{
            const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=ثد`
            const response = await fetch(url)
            const data = await response.json() 
            console.log('Data:', data)

            if(!data.results){
                suggestions.classList.remove('active') 
                return
            }

            suggestions.innerHTML = ''

            data.results.forEach(city  => {
                const div  = document.createElement('div')
                div.className = 'suggestion-item'
                div.textContent = `${city.name}, ${city.country}`

                div.addEventListener('click', () =>{
                    inputCity.value = city.name
                    suggestions.classList.remove('active')
                })
                suggestions.appendChild(div)
            })
            suggestions.classList.add('active')
            
        }catch(error){
            result.textContent ='error' + error.message
        }
    }  
)
btnSearch.addEventListener('click', 
async() => {
    const city =inputCity.value

    if(city === '') return

    try{
        const url = `https://wttr.in/${city}?format=j1`
        const response = await fetch(url)
        const data = await response.json()

        const temp = data.current_condition[0].temp_C
        const desc = data.current_condition[0].weatherDesc[0].value

        const descLower = desc.toLowerCase()
        
        if (descLower.includes('sunny') || descLower.includes('clear')) {
            document.body.className = 'sunny'
        } else if (descLower.includes('cloud') || descLower.includes('overcast')) {
            document.body.className = 'cloudy'
        } else if (descLower.includes('rain') || descLower.includes('drizzle')) {
            document.body.className = 'rainy'
        } else if (descLower.includes('snow')) {
            document.body.className = 'snowy'
        } else {
            document.body.className = ''  
        }

        result.innerHTML = `
        <h2> ${city}🌤️</h2>
        <p> temperature: ${temp}°C 🌡️</p>
        <p> Status: ${desc} 📝</p>`

    }catch(error){
        result.textContent ='error' + error.message
    }
})