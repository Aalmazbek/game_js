let $login = document.querySelector('.login')
let $loginInput = document.querySelector('#login-input')
let $loginBtn = document.querySelector('#login-button')
let $loginWarning = document.querySelector('#login-warning')

let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')

let userName

$loginBtn.addEventListener('click', function() {
    if ($loginInput.value != '') {
        userName = $loginInput.value
        $login.classList.add('hide')
    }   else{
        $loginWarning.classList.remove('hide')
    }

    updateResults()
})


let playerResults = []

if (JSON.parse(localStorage.getItem('player-results')) != undefined) {
    playerResults = (JSON.parse(localStorage.getItem('player-results')))
} 

















let $time = document.querySelector('#time')
let $gameTime = document.querySelector('#game-time')

$gameTime.addEventListener('input', function(){
    if ($gameTime.value >= 5) {
        $time.innerHTML = Number($gameTime.value).toFixed(1)
    }   else{
        $gameTime.value = 5
    }
})




// function timer() {
//     setTimeout(function () {
//         console.log('sec');
//     }, 1000)    

//     setInterval(function(){
//         console.log('second');
//     }, 1000)
// }







let $btnStart = document.querySelector('#start')
let $gamePlace = document.querySelector('#game')

$btnStart.addEventListener('click', startGame)

function startGame() {
    points = 0
    $btnStart.classList.add('hide')
    
    $gamePlace.style.backgroundColor = 'white'
    $gameTime.setAttribute('disabled', 'true')
    
    
    createBox()
    timer()
}






function createBox() {
    $gamePlace.innerHTML = ''
    
    let box = document.createElement('div')
    const boxSize = Math.round(Math.random() * (150 - 30) + 30)
    box.style.width = box.style.height = `${boxSize}px`
    box.style.backgroundColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
    box.style.position = 'absolute'
    
    
    box.style.top =  `${Math.round(Math.random() * ((300-boxSize) - 0) + 0)}px`
    box.style.left =  `${Math.round(Math.random() * ((300-boxSize) - 0) + 0)}px`
    
    // let randomX = Math.floor(Math.random()*(3 - 1) + 1)
    // let randomY = Math.floor(Math.random()*(3 - 1) + 1)
    // if (randomY = 1) {
        //     box.style.top = `${Math.floor(Math.random()*50)}%`
        // }   else{
            //     box.style.bottom = `${Math.floor(Math.random()*50)}%`
            // }
            
            // if (randomX = 1) {
                //     box.style.right = `${Math.floor(Math.random()*50)}%`
                // }   else{
                    //     box.style.left = `${Math.floor(Math.random()*50)}%`
                    // }
                    
                    box.setAttribute('data-box', 'true')
                    
                    $gamePlace.insertAdjacentElement('afterbegin', box)
                    
}
                

$gamePlace.addEventListener('click', clicked)
let points

function clicked(event) {
    if (event.target.dataset.box){
        points += 1
        createBox()
    }
}












function timer() {
    let interval = setInterval(function() {
        $time.textContent = ($time.textContent - 0.1).toFixed(1)
        if ($time.textContent == 0.0) {
            clearInterval(interval)
            gameEnd()
        }   
    }, 100);

}


let $results = document.querySelector('.results')

function gameEnd(){
    $btnStart.classList.remove('hide')
    $gamePlace.style.backgroundColor = '#ccc'
    $gamePlace.innerHTML = ''
    $time.innerHTML = Number($gameTime.value).toFixed(1)

    let player = {
        name: userName,
        points: points,
        time: $time.textContent    
    }

    playerResults.push(player)


    localStorage.setItem('player-results', JSON.stringify(playerResults))

    updateResults()
    $gameTime.removeAttribute('disabled')
    showResult()
}











function updateResults() {

    $results.innerHTML = ''

    playerResults.sort((a, b) => a.points > b.points ? -1 : 1)

    if (playerResults.length > 10) {
        playerResults = playerResults.slice(0, 10)
    }
    

    playerResults.forEach(el => {
        $results.insertAdjacentHTML('beforeend', `
            <div class="player-result">
                <h3>${el.name}</h3>
                <h3>${el.points} очков</h3>
                <h3>${el.time} сек</h3>
            </div>
        `)    
    })

}




function showResult() {
    $resultHeader.classList.remove('hide')
    $result.innerHTML = points
}