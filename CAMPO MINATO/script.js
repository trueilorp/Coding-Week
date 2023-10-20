// RECUPERO DALLA PAGINA HTML TUTTI GLI ELEMENTI DI INTERESSE

const scoreCounter = document.querySelector('.score-counter')
const grid = document.querySelector('.grid')
const endGameScreen = document.querySelector('.end-game-screen')
const endGameText = document.querySelector('.end-game-text')
const playAgainButton = document.querySelector('.play-again')

// DICHIARO LE COSTANTI 
const totalCells = 100; 
const totalBombs = 19;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

// GENERO TOT BOMBE CASUALI
while(bombsList.length < totalBombs){
    const number = Math.floor(Math.random() * totalCells) + 1; //equivale a moltiplicare per 100
    if (!bombsList.includes(number)) bombsList.push(number); //evito che ci siano numeri uguali
}

console.log(bombsList);

// GRIGLIA E LOGICA DI GIOCO
let isCellEven = false; // per capire se la cella è pari, per celle scure e chiare
let isRowEven = false; // per sfalsare le righe 

for (let i=1; i<=totalCells; i++){
    // CREO LE CELLE SCURE E CHIARE CON UN FOR
    const cell = document.createElement('div'); //creo contenitore div 
    cell.classList.add('cell');

    isCellEven = i % 2 === 0;
    if (isRowEven && isCellEven) cell.classList.add('cell-dark');
    else if (!isRowEven && !isCellEven) cell.classList.add('cell-dark');

    // quando sono alla fine della riga
    if(i % 10 === 0) isRowEven = !isRowEven;
    grid.appendChild(cell);

    // GESTIONE CLICK DELLA CELLA
    //mi metto in ascolto, che evento ascoltare (click),, che funzione usare quando l'evento si verifica
    cell.addEventListener('click', function () {
        //console.log('cliccata cella');
        if(cell.classList.contains('cell-clicked')) return; //se è già stata cliccata non fato niente
        if (bombsList.includes(i)){ // se c'è la bomba
            cell.classList.add('cell-bomb')
            endGame(false);
        }
        else{ //se sei salvo
            cell.classList.add('cell-clicked');
            updateScore();
        }
    });
}

// EVENTI
playAgainButton.addEventListener('click', function(){
    location.reload();
})

// FUNCTION
function updateScore(){
    score++;
    console.log('aggiorno punteggio');
    // inserisco il numero nel contatore
    scoreCounter.innerText = String(score).padStart(5,0); //padStart mi tiene gli zeri iniziali
    if(score == maxScore) endGame(true);
}

function endGame(isVictory){
    if (isVictory === true){
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'YOU<br>WIN';
    }
    endGameScreen.classList.remove('hidden');
    revealAllBombs();
}

function revealAllBombs(){
    //prendo tutte le celle
    const cells = document.querySelectorAll('.cell');
    for( let i = 1; i<= cells.length; i++){
        if (bombsList.includes(i)){
            const cellToReveal = cells[i-1];
            cellToReveal.classList.add('cell-bomb');
        }
    }
}