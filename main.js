const VALUE_EMPTY = 1;
const VALUE_X = 2;
const VALUE_O = 3;

function Cell(x, y) {
    this.value = VALUE_EMPTY;
    
    this.getHtml = function () {
        return '<td id="cell'+x+':'+y+'" onclick="play('+x+','+y+')"></td>';
    };
    this.fill = function () {
        let cellId = document.getElementById("cell"+x+":"+y);
        switch (this.value) {
            case VALUE_X:
                cellId.innerHTML = "X";
                break;
            case VALUE_O:
                cellId.innerHTML = "O";
                break;
            default:
                cellId.innerHTML = "";
        }
    }
}
function GameBoard(row, col, idBoard, idTurnMessage) {
    this.cells = [];
    this.turn = VALUE_O;
    this.isOver = false;
    this.turnMessage = "Turn O";
    this.drawBoard = function () {
        let gameBoardId = document.getElementById(idBoard);
        let board = "<table style='border: 1px solid black; " +
            "border-collapse: collapse' border='1px' cellpadding='20px'>";
        for (let i = 0; i < row; i++) {
            let row = [];
            board += '<tr>';
            for (let j = 0; j < col; j++) {
                let cell = new Cell(i,j);
                board += cell.getHtml();
                row.push(cell);
            }
            board += '</tr>';
            this.cells.push(row);
        }
        board += '</table>';
        gameBoardId.innerHTML = board;
        this.displayTurnMessage();
    };
    this.displayTurnMessage = function () {
        return document.getElementById(idTurnMessage).value = this.turnMessage;
    };
    this.play = function (x,y) {
        if (this.isOver) {
            return;
        }
        let cell = this.cells[x][y];
        if (cell.value === VALUE_EMPTY) {
            cell.value = this.turn;
            cell.fill();
            this.check(x,y);
            if (this.turn === VALUE_O) {
                this.turn = VALUE_X;
                this.turnMessage = "Turn X"
            } else {
                this.turn = VALUE_O;
                this.turnMessage = "Turn O"
            }
            this.displayTurnMessage();
        }
        else {
            alert("Cell is not empty");
        }
    };
    this.check = function (x, y) {
        let cell = this.cells[x][y];
        let count = 1;
        //Horizontal
        let i = 1;
        while (y + i < col && this.cells[x][y+i].value === cell.value) {
            count++;
            i++;
        }
        i = 1;
        while (y - i >= 0 && this.cells[x][y-i].value === cell.value) {
            count++;
            i++;
        }
        this.endGame(count);
        //Vertical
        count = 1;
        let j = 1;
        while (x + j < row && this.cells[x+j][y].value === cell.value) {
            count++;
            j++;
        }
        j = 1;
        while (x - j >= 0 && this.cells[x-j][y].value === cell.value) {
            count++;
            j++;
        }
        this.endGame(count);
        //left diagonal
        i = 1;
        j = 1;
        count = 1;
        while (x + j < row && y + j < col && this.cells[x+j][y+i].value === cell.value) {
            count++;
            i++;
            j++;
        }
        i = 1; j = 1;
        while (x - j >= 0 && y - i >= 0 && this.cells[x - j][y-i].value === cell.value) {
            count++;
            i++; j++;
        }
        this.endGame(count);
        //right diagonal
        i = 1; j = 1;
        count = 1;
        while (x - j >= 0 && y + i < col && this.cells[x-j][y+i].value === cell.value) {
            count++;
            i++; j++;
        }
        i = 1; j = 1;
        while (x + j < row && y - i >= 0 && this.cells[x+j][y-i].value === cell.value) {
            count++;
            i++; j++;
        }
        this.endGame(count);
    };
    this.endGame = function (count) {
        if (count >= 5) {
            this.isOver = true;
            alert("you win !!!")
        }
    }
}
function start() {
    gameboard = new GameBoard(10, 10, "gameBoard", "message");
    gameboard.drawBoard();
}
function play(x,y) {
    gameboard.play(x,y);
}
let gameboard;
start();

