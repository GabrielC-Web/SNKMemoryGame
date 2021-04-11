document.addEventListener('DOMContentLoaded', () => {

    const cardsArray = [
        {
            name: 'BeastTitan',
            img: 'img/best-titan-png.png'
        },
        {
            name: 'BeastTitan',
            img: 'img/best-titan-png.png'
        },
        {
            name: 'AttackOnTitan',
            img: 'img/attack-on-titan-png2.png'
        },
        {
            name: 'AttackOnTitan',
            img: 'img/attack-on-titan-png2.png'
        },
        {
            name: 'FemenineTitan',
            img: 'img/femenine-titan-png2.png'
        },
        {
            name: 'FemenineTitan',
            img: 'img/femenine-titan-png2.png'
        },
        {
            name: 'ColosalTitan',
            img: 'img/colosal-titan-png.png'
        },
        {
            name: 'ColosalTitan',
            img: 'img/colosal-titan-png.png'
        },
        {
            name: 'CarguerTitan',
            img: 'img/carguer-titan-png1.png'
        },
        {
            name: 'CarguerTitan',
            img: 'img/carguer-titan-png1.png'
        },
        {
            name: 'JawTitan',
            img: 'img/jaw-titan-png.png'
        },
        {
            name: 'JawTitan',
            img: 'img/jaw-titan-png.png'
        },
        {
            name: 'FounderTitan',
            img: 'img/founder-titan-png.png'
        },
        {
            name: 'FounderTitan',
            img: 'img/founder-titan-png.png'
        },
        {
            name: 'HammerTitan',
            img: 'img/hammer-titan-png.png'
        },
        {
            name: 'HammerTitan',
            img: 'img/hammer-titan-png.png'
        },
        {
            name: 'IroncladTitan',
            img: 'img/ironclad-titan-png.png'
        },
        {
            name: 'IroncladTitan',
            img: 'img/ironclad-titan-png.png'
        }
    ]

    const startButton = document.getElementById('startBtn')
    const startBox = document.getElementById('startBox')
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    const scoreDisplay = document.querySelector('#score')
    const reactionDisplay = document.getElementById('reaction')
    const resultBox = document.getElementById('resultBox')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []


    cardsArray.sort(() => 0.5 - Math.random())

    reactionDisplay.style.visibility = 'hidden'

    // Starts the game
    startButton.addEventListener('click', () => {
        grid.classList.remove('hide')
        reactionDisplay.style.visibility = 'hidden'
        startBox.style.margin = '0px auto'
        resultDisplay.classList.add('hide')
        scoreDisplay.classList.add('hide')
        startButton.classList.add('hide')
        document.querySelector('.timeCount').classList.remove('hide')
        document.querySelector('.important').classList.remove('hide')
    })

    // starts the chronometer in the game
    grid.addEventListener('click', startCount);

    // Prevent we don't activate the same function twice
    function startCount() {
        count()
        if (count = true) {
            grid.removeEventListener('click', startCount);
        }
    }

    function createBoard() {
        for (let i = 0; i < cardsArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'img/logo.jpeg')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card);
            
        }
    }

    var chronometerCall 
    
    var hour = '00',
            min = '00',
            sec = '00',
            score = '0'

    // This is the chronometer
    function count() {
        console.log('Contando!')
        
        

        var timer = () => {
            sec++ 
            if(sec < 10) 
                sec = '0'+ sec
            if(sec > 59)
                {sec = '00'
                min++
            if(min < 10) 
                min = '0' + min}
            if(min > 59)
                {min = '00'
                hour++
            if(hour < 10) 
                hour = '0' + hour}
            if(hour > 59)
                {hour = '00'}
            document.querySelector('.timeCount').textContent = `${hour}:${min}:${sec}`;
            score++
        }
        chronometerCall = setInterval(timer, 1000);
    }
    document.querySelector('.timeCount').textContent = `${hour}:${min}:${sec}`

    // check match
    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if (optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'img/logo.jpeg')
            //cards[optionTwoId].setAttribute('src', 'img/1.png')
            alert('You have clicked the same image!')
        } 
        else if(cardsChosen[0] === cardsChosen[1]){
            cardsWon.push(cardsChosen)
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            reactionDisplay.innerHTML = "You got a match!"
            reactionDisplay.style.visibility = 'visible'
            document.body.style.backgroundColor = 'green'
            setTimeout(() => {
                reactionDisplay.style.visibility = 'hidden'
                document.body.style.backgroundColor = '#CE8964'
            }, 750);
        } else {
            cards[optionOneId].setAttribute('src', 'img/logo.jpeg')
            cards[optionTwoId].setAttribute('src', 'img/logo.jpeg')
            document.body.style.backgroundColor = 'red'
            reactionDisplay.style.visibility = 'visible'
            reactionDisplay.innerHTML = "You made a mistake!"
            setTimeout(() => {
                reactionDisplay.style.visibility = 'hidden'
                document.body.style.backgroundColor = '#CE8964'
            }, 750);
            
        }
        cardsChosen = []
        cardsChosenId = []
        if (cardsWon.length === cardsArray.length/2) {
            resultDisplay.classList.remove('hide')
            scoreDisplay.style.visibility = 'visible'
            clearInterval(chronometerCall)
            let total = document.querySelector('.timeCount').innerHTML
            scoreDisplay.textContent = 'You got ' + Math.round(12/score * 1000) + ' points!'
            console.log(total)
            resultBox.classList.add('hide')
            document.body.style.backgroundColor = '#CE8964'
            resultDisplay.classList.remove('hide')
            scoreDisplay.classList.remove('hide')
        }

    }
    scoreDisplay.style.visibility = 'hidden'
    
    scoreDisplay.textContent = Math.round(12/score * 1000) + '!'

    // flip your card
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardsArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardsArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 750)
        }
    }
    createBoard();
})