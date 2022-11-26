import game from './game.js'

const startingGameButton = document.querySelector('.start-game')
const menuConteiner = document.querySelector('.menu-container')

startingGameButton.addEventListener('click', () => {
  fetch('https://random-word-api.herokuapp.com/word')
    .then((res) => res.json())
    .then((res) => {
      game(res[0])
    })
  setTimeout(() => {
    menuConteiner.classList.remove('active')
  }, 500)
})
