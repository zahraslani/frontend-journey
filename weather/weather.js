const inputCity = document.getElementById('inputCity')
const btnSearch = document.getElementById('btnSearch')
const result =document.getElementById('result')

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

        result.innerHTML = `
        <h2>🌤️ ${city}</h2>
        <p>🌡️ emperature: ${temp}°C</p>
        <p>📝 Status: ${desc}</p>`

    }catch(error){
        result.textContent ='error' + error.message
    }
})