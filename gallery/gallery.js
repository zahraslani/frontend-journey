const modal = document.getElementById('modal')
const modalImg = document.getElementById('modalImg')
const images = document.querySelectorAll('.gallery img')

images.forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src
    modal.classList.add('active')
  })
})

modal.addEventListener('click', () => {
  modal.classList.remove('active')
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('active')
  }
})