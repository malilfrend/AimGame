const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time') 
const board = document.querySelector('#board')
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = Number(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        creatRandomCircle()
    }
})

function startGame () {
    setTimeout(decreaseTime, 1000)
    creatRandomCircle()
    setTime(time)
}

function decreaseTime () {
    if (time === 0) {
        finishGame()
    }else {
        let current = --time
        if (current < 10) {
            timeEl.innerHTML = `00:0${current}`
            setTimeout(decreaseTime, 1000)
        }else {
            setTime(current)
            setTimeout(decreaseTime, 1000)
        }
    }
    
}

function setTime (value) {
    timeEl.innerHTML = `00:${value}` 
}

function finishGame() {
    timeEl.parentElement.classList.add('hide')
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`
    board.insertAdjacentHTML('afterend', `<button class="again">Начать заново</button>`)
    const againBtn = document.querySelector('.again')
    againBtn.addEventListener('click', (event) => {
        if (event.target.classList.contains('again')) {
            event.preventDefault()
            score = 0
            screens[1].classList.remove('up')
            board.nextElementSibling.remove()
            board.innerHTML = ''
            againBtn.remove()
            setTimeout(() => {timeEl.parentElement.classList.remove('hide')}, 500)
        }
    })
}

function creatRandomCircle () {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size) 
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
