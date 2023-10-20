const scoreCounter = document.querySelector('.score-counter')
const grid = document.querySelector('.grid')
const endGameScreen = document.querySelector('.end-game-screen')
const endGameText = document.querySelector('.end-game-text')
const playAgainButton = document.querySelector('.play-again')

const totalCells = 100;
const totalBombs = 10;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

while(bombsList.length < totalBombs){
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsList.includes(number)) bombsList.push(number);
}

console.log(bombsList);


// GRIGLIA E LOGICA DI GIOCO

let isCellEven = false;
let isRowEven = false;

for(let i = 1; i <= totalCells; i++){

    // ? Gestione click 
    cell.addEventListener('click', function () {
        if(cell.classList.contains('cell-clicked')) return;
        if (bombsList.includes(i)){
            cell.classList.add('cell-bomb')
            endGame();
        }
        else{
            cell.classList.add('cell-clicked');
            updateScore();
        }
    });
}
// FUNCTION
function updateScore(){
    score++;
    console.log('aggiorno punteggio')
    scoreCounter.innerText = String(score).padStart(5,0);

    if(score == maxScore) endGame(true);
}

function endGame(isVictory){
    if (isVictory){
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'YOU<br>WIN'
        console.log('YOU WIN')
    }else{
        console.log('GAME OVER')
    } 
}

// EVENTI
playAgainButton.addEventListener('click', function(){
    location.reload();
})