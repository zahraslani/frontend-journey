const itemName = document.getElementById('itemName')
const itemPrice = document.getElementById('itemPrice')
const addBtn = document.getElementById('addBtn')
const itemList = document.getElementById('itemList')
const total = document.getElementById('total')

let items = []

addBtn.addEventListener('click', addItem)

function addItem () {
    const name = itemName.value
    const price = Number(itemPrice.value)

    if (name === '' || price === 0) return

    items.push({name, price})

    itemName.value = ''
    itemPrice.value = ''

    renderItem()
    updateTotal()
}

function renderItem(){

    itemList.innerHTML = ''

    items.forEach((item, index) => {
        const li = document.createElement('li')
        const span = document.createElement('span')
        span.textContent = `${item.name} - ${item.price} تومان`
        li.appendChild(span)

        const delBtn = document.createElement('button')
        delBtn.textContent = 'Delete'
        delBtn.classList.add('delBtn')
        li.appendChild(delBtn)

        delBtn.addEventListener('click', () =>{

            items.splice(index,1)
            renderItem()
            updateTotal()
        })
        itemList.appendChild(li)
    })
}

function updateTotal(){
  const sum = items.reduce((acc, item) => acc + item.price, 0)
  total.textContent = `Total: ${sum} تومان`
}
