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

const buttonsContainer = document.querySelector('.buttons-container')
const liveLeftsDisplay = document.querySelector('.lifes-left')
const passwordDisplay = document.querySelector('.password')
const menuConteiner = document.querySelector('.menu-container')
const gameStatus = document.querySelector('.game-status')
const password = document.querySelector('.finish')

wonAudio.volume = 0.1
lostAudio.volume = 0.1

let lettersIndex = []
let hiddenPassword = ''
let lives = 10
let counter = 0
let newAnswer = ''
let buttons = []

const game = (randomWord) => {
  resetValues()
  hidePassword(randomWord)
  createButtons(randomWord)
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

const hidePassword = (answer) => {
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

const createButtons = (randomWord) => {
  buttonsContainer.innerHTML = ''
  for (let i = 0; i < alphabet.length; i++) {
    const button = document.createElement('button')
    button.innerHTML = alphabet[i].toUpperCase()
    buttons.push(button)
    button.style.background = 'goldenrod'
    button.style.color = 'whitesmoke'
    buttonsContainer.appendChild(button)
  }
  clickedButton(randomWord)
}

const clickedButton = (randomWord) => {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const letter = e.currentTarget.textContent

      if (randomWord.toUpperCase().includes(letter)) {
        showLetter(button)
        changeLetters(letter, randomWord)
      } else {
        failedGuess(button, randomWord)
      }
    })
  })
}

const displayOnScreen = (hiddenPassword) => {
  passwordDisplay.innerHTML = hiddenPassword
}

const showLetter = (button) => {
  //Visual Effects
  button.style.background = 'green'
  button.style.pointerEvents = 'none'
}

const changeLetters = (letter, randomWord) => {
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i].toUpperCase() == letter) {
      lettersIndex.push({ index: i, char: letter })
      counter++
    }
  }
  displayOnScreen(replaceText(randomWord))
}

const failedGuess = (button, randomWord) => {
  //Visual Effects
  if (button.style.opacity != '0' && lives > 0) lives--
  if (lives == 0) {
    password.innerHTML = `Given word was: ${randomWord.toUpperCase()}`
    gameStatus.innerHTML = 'Better Luck next Time !'
    setTimeout(() => {
      menuConteiner.classList.add('active')
    }, 600)
  }

  button.style.background = 'red'
  button.style.pointerEvents = 'none'
  button.style.cursor = 'auto'

  liveLeftsDisplay.innerHTML = lives
}

const replaceText = (randomWord) => {
  newAnswer = ''
  let is = false

  for (let i = 0; i < randomWord.length; i++) {
    for (let y = 0; y < lettersIndex.length; y++) {
      if (i == lettersIndex[y].index) {
        newAnswer += lettersIndex[y].char
        is = true
      }
    }
    if (!is) newAnswer += '-'
    is = false
  }

  if (newAnswer.toUpperCase() == randomWord.toUpperCase()) {
    password.innerHTML = `Given word was: ${randomWord.toUpperCase()}`
    gameStatus.innerHTML = 'You won, congratulations !'

    setTimeout(() => {
      menuConteiner.classList.add('active')
    }, 600)
  }

  return newAnswer
}

export default game
