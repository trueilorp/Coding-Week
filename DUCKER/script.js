// RECUPERO DALLA PAGINA HTML TUTTI GLI ELEMENTI DI INTERESSE

const grid = document.querySelector('.grid');
const stackBtn = document.querySelector('.stack');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');
const timer = document.querySelector('.time-counter');

const gridMatrix = [
    ['','','','','','','','',''],
    ['river', 'wood','wood','river', 'wood','river','river','river','river',],
    ['river', 'river', 'river', 'wood', 'wood','river', 'wood', 'wood', 'river'],
    ['','','','','','','','',''],
    ['road', 'bus','road','road', 'road','car','road','road','road'],
    ['road', 'road', 'road', 'car', 'road','road', 'road', 'road', 'bus'],
    ['road', 'road', 'car', 'road', 'road','road', 'bus', 'road', 'road'],
    ['','','','','','','','',''],
    ['','','','','','','','','']  
];

const victoryRow = 0;
const riverRows = [1,2];
const roadRows = [4,5,6];
const duckPosition = {y: 8, x: 4};
let contentBeforeDuck = '';
let time = 15;

function applyCellStyle (cell, rowIndex, cellIndex){
    const isRowEven = rowIndex % 2 === 0;
                const isCellEven = cellIndex % 2 === 0;
                if (isRowEven && isCellEven){
                    cell.classList.add('cell-dark');
                }else if (!isRowEven && !isCellEven){
                    cell.classList.add('cell-dark');
                }
}
function drawGrid(){
    grid.innerHTML = ''; //pulisco i contenuti precedenti

    gridMatrix.forEach(function(rowCells, rowIndex){
        rowCells.forEach(function(cellContent, cellIndex){
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if(cellContent !== '') cell.classList.add(cellContent); //aggiungo ad ogni cella la sua classe di appartenenza, quindi se è river aggiungo la classe river
            
            //colore le righe in maniera appropiata
            if(riverRows.includes(rowIndex)){
                cell.classList.add('river');
            }else if (roadRows.includes(rowIndex)){
                cell.classList.add('road');
            }else{
                applyCellStyle(cell, rowIndex, cellIndex);                
            }
            
            grid.appendChild(cell);
        });
    });
}

function placeDuck (){
    //Prima di mettere la papera mi segno cosa cera
    contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];

    gridMatrix[duckPosition.y][duckPosition.x] = 'duck';
}

function moveDuck(event){
    //Prima di muovera la papera rimetto quello che c'era
    gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;
    switch(event.key){
        case 'ArrowUp':
            if(duckPosition.y > 0) duckPosition.y--;
            break;
        case 'ArrowDown':
            if(duckPosition.y < 8) duckPosition.y++;
            break;
        case 'ArrowLeft':
            if(duckPosition.x > 0) duckPosition.x--;
            break;
        case 'ArrowRight':
            if(duckPosition.x < 8) duckPosition.x++;
            break;
    }
    drawElements();
}

function drawElements(){
    placeDuck();
    checkDuckPosition();
    drawGrid();
}

function endGame(reason){
    if(reason === 'duck-arrived'){
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'YOU<br>WIN';
    }
    clearInterval(loop);
    clearInterval(countdown);
    document.removeEventListener('keyup', moveDuck); //si mette in attesa di un tasto schiacciato
    gridMatrix[duckPosition.y][duckPosition.x] = reason;
    endGameScreen.classList.remove('hidden');
}

function checkDuckPosition(){
    if(duckPosition.y === victoryRow) endGame('duck-arrived');
    else if (contentBeforeDuck === 'river') endGame('duck-drowned');
    else if (contentBeforeDuck === 'bus' || contentBeforeDuck === 'car') endGame('duck-hit');
    else if (time === 0) endGame('time-over');
}


/*********
 * SVOLGIMENTO GIOCO
 */

drawElements(); //evita che lagghi quando deve caricare il gioco

function moveRow(rowIndex){
    const rowCells = gridMatrix[rowIndex];
    const lastCell = rowCells.pop();

    rowCells.unshift(lastCell);
}

function makeDinamic(){
    gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;
    contentBeforeDuck = gridMatrix[duckPosition.y][duckPosition.x];
    if(contentBeforeDuck === 'wood' && duckPosition.x < 8) duckPosition.x++;
    for (let i = 1; i <= 6; i++){
        moveRow(i);   
    }
    drawElements();
    
}

function decrementTime(){
    time--;
    timer.innerText = String(time).padStart(5,0);
}

/*********
 * EVENTI DI GIOCO
 */

document.addEventListener('keyup', moveDuck); //si mette in attesa di un tasto schiacciato
playAgainButton.addEventListener('click', function(){
    location.reload();
});


const loop = setInterval(makeDinamic, 300);
const countdown = setInterval(decrementTime, 1000);