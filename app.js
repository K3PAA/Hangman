let alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

fetch('https://random-word-api.herokuapp.com/word')
  .then((res) => res.json())
  .then((res) => {
    let randomWord = res

    console.log(randomWord)
  })

const startingGameButton = document.querySelector('.start-game')
const buttonsContainer = document.querySelector('.buttons-container')
const liveLeftsDisplay = document.querySelector('.lifes-left')
const passwordDisplay = document.querySelector('.password')
const menuConteiner = document.querySelector('.menu-container')

let answer = 'ab'
let indexOf = []

let buttons = []
let lettersIndex = []
let hiddenPassword = ''
let lives = 10
let counter = 0
let newAnswer = ''

const createButtons = () => {
  buttonsContainer.innerHTML = ''
  for (let i = 0; i < alphabet.length; i++) {
    const button = document.createElement('button')
    button.innerHTML = alphabet[i].toUpperCase()
    buttons.push(button)
    button.style.background = 'goldenrod'
    button.style.color = 'whitesmoke'
    buttonsContainer.appendChild(button)
  }
  clickedButton()
}
const resetValues = () => {
  lettersIndex = []
  buttons = []
  hiddenPassword = ''
  lives = 10
  counter = 0
  newAnswer = ''
  liveLeftsDisplay.innerHTML = lives
}

const hidePassword = () => {
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] == ' ') {
      hiddenPassword += ' '
      lettersIndex.push({ index: i, char: ' ' })
    } else {
      hiddenPassword += '-'
    }
  }

  displayOnScreen(hiddenPassword)
}

const displayOnScreen = (hiddenPassword) => {
  passwordDisplay.innerHTML = hiddenPassword
}

const clickedButton = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const letter = e.currentTarget.textContent

      if (answer.toUpperCase().includes(letter)) {
        showLetter(button)
        changeLetters(letter)
      } else {
        failedGuess(button)
      }
    })
  })
}

const showLetter = (button) => {
  //Visual Effects
  button.style.background = 'green'
  button.style.pointerEvents = 'none'
}

const changeLetters = (letter) => {
  for (let i = 0; i < answer.length; i++) {
    if (answer[i].toUpperCase() == letter) {
      lettersIndex.push({ index: i, char: letter })
      counter++
    }
  }
  displayOnScreen(replaceText())
}

const failedGuess = (button) => {
  //Visual Effects
  if (button.style.opacity != '0' && lives > 0) lives--
  if (lives == 0) {
    setTimeout(() => {
      menuConteiner.classList.add('active')
    }, 600)
  }

  button.style.cursor = 'auto'
  button.style.opacity = '0'

  liveLeftsDisplay.innerHTML = lives
}

const replaceText = () => {
  newAnswer = ''
  let is = false

  for (let i = 0; i < answer.length; i++) {
    for (let y = 0; y < lettersIndex.length; y++) {
      if (i == lettersIndex[y].index) {
        newAnswer += lettersIndex[y].char
        is = true
      }
    }
    if (!is) newAnswer += '-'
    is = false
  }

  if (newAnswer.toUpperCase() == answer.toUpperCase()) {
    setTimeout(() => {
      menuConteiner.classList.add('active')
    }, 600)
  }

  return newAnswer
}

startingGameButton.addEventListener('click', () => {
  resetValues()
  hidePassword()
  createButtons()
  menuConteiner.classList.remove('active')
})
