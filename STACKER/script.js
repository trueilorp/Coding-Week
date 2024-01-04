// RECUPERO DALLA PAGINA HTML TUTTI GLI ELEMENTI DI INTERESSE

const grid = document.querySelector('.grid');
const gridMatrix = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [1,1,1,0,0,0],
];
let currentRowIndex = gridMatrix.length - 1;
let barDirection = 'right';

function draw(){
    grid.innerHTML = '';
    gridMatrix.forEach(function(rowContent, rowIndex){
        rowContent.forEach(function(cellContent, cellIndex){
            const cell = document.createElement('div');
            cell.classList.add('cell');

            const isRowEven = rowIndex % 2 === 0;
            const isCellEven = cellIndex % 2 === 0;

            if ((isRowEven && isCellEven)||(!isRowEven && !isCellEven)){
                cell.classList.add('cell-dark');
            }

            if(cellContent === 1){
                cell.classList.add('bar');
            }

            grid.appendChild(cell);
        });
    });
}

function moveRight(row){
    row.pop();
    row.unshift(0);
}

function moveLeft(row){
    row.shift();
    row.push(0);
}

function isRightEdge(row){
    const lastElement = row[row.length - 1];
    return lastElement === 1;
}

function isLeftEdge(row){
    const firstElement = row[0];
    return firstElement === 1;
}

function moveBar(){
    const row = gridMatrix[currentRowIndex];
    if (barDirection === 'right'){
        moveRight(row);
        if (isRightEdge(row)){
            barDirection = 'left';
        }
    }else if (barDirection === 'left'){
        moveLeft(row);
        if (isLeftEdge(row)){
            barDirection = 'right';
        }
    }
}


function main(){
    draw();
    moveBar();
    draw();
}

setInterval(main, 500);