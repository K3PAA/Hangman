let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z']

const buttonsContainer = document.querySelector('.buttons-container')
const liveLeftsDisplay = document.querySelector('.lifes-left')
const passwordDisplay = document.querySelector('.password')

const buttons = []
let lives = 10
let answer = "Ninja"
let hiddenPassword = ''

for(let i=0; i< alphabet.length; i++){
    const button = document.createElement('button')
    button.innerHTML = alphabet[i].toUpperCase()
    buttons.push(button)
    buttonsContainer.appendChild(button)
}   


const hidePassword = () =>{
    for(let i=0; i<answer.length; i++){
        if(answer[i] == ' ') hiddenPassword += ' '
        else hiddenPassword += answer[i].replace(answer[i], '-')
    }
    displayOnScreen(hiddenPassword)
}

const displayOnScreen = (hiddenPassword) =>{
    passwordDisplay.innerHTML = hiddenPassword
}

hidePassword()

buttons.forEach( button => {
    button.addEventListener('click', (e)=>{
        const letter = e.currentTarget.textContent

        if(answer.toUpperCase().includes(letter)){
            showLetter(button)
            changeLetter(letter)
            
        }else{
            failedGuess(button)
        }

    })
})

const showLetter = (button) =>{
    //Visual Effects
    button.style.background = 'green'
    button.style.pointerEvents = 'none'
}

const changeLetter = (letter) =>{
    for(let i=0; i<answer.length; i++){

        if(answer[i].toUpperCase() == letter){
            hiddenPassword[i].replace(hiddenPassword[i],'w')
            console.log(hiddenPassword)
           // displayOnScreen(hiddenPassword)
        }

    }
    console.log(hiddenPassword)
}
const failedGuess = (button) => {
    //Visual Effects
    button.style.cursor = 'auto'
    button.style.opacity = '0'

    if(button.style.opacity != '0') lives--
    liveLeftsDisplay.innerHTML = lives
}
