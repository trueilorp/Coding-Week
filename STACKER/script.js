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

            grid.appendChild(cell)
        });
    });
}

function moveBar(){
    
}
draw();

function main(){


}
