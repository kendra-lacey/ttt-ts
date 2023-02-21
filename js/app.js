"use strict";
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], //R-L diagonal
];
/*---------------------------- Variables (state) ----------------------------*/
//  Define the required variables used to track the state of the game
let board, turn, winner, tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEls = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');
const boardEl = document.querySelector('.board');
/*----------------------------- Event Listeners -----------------------------*/
init();
boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
function render() {
    updateBoard();
    messageEls.classList.remove('animate__animated', 'animate__heartBeat');
    updateMessage();
}
function placePiece(idx) {
    board[idx] = turn;
}
function updateBoard() {
    squareEls.forEach((square, idx) => {
        if (board[idx] === 1) {
            square.textContent = '🐈';
        }
        else if (board[idx] === -1) {
            square.textContent = '🐈‍⬛';
        }
        else if (board[idx] === 0) {
            square.textContent = '';
        }
    });
}
function updateMessage() {
    if (!winner && !tie) {
        messageEls.textContent = `It's ${turn === 1 ? "🐈" : "🐈‍⬛"}'s turn!`;
    }
    else if (!winner && tie) {
        messageEls.textContent = 'Tie Game aka cats game Mee-OWW 😸';
    }
    else {
        messageEls.textContent = `Congratulations! ${turn === 1 ? '🐈' : '🐈‍⬛'} wins 🎉! `;
    }
    messageEls.classList.add('animate__animated', 'animate__heartBeat');
}
// I HAVE NO IDEA HOW TO DO THIS //Figured it out
function handleClick(evt) {
    if (!(evt.target instanceof HTMLElement))
        return;
    if (evt.target.textContent !== '')
        return;
    if (winner === true || tie === true)
        return;
    let sqIdx = parseInt(evt.target.id.slice(2));
    // console.log(evt.target.id)
    placePiece(sqIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}
function checkForTie() {
    if (!board.includes(0)) {
        tie = true;
    }
}
function checkForWinner() {
    winningCombos.forEach(combo => {
        let total = 0;
        combo.forEach(position => {
            total += board[position];
            if (Math.abs(total) === 3) {
                winner = true;
                return;
            }
        });
    });
}
function switchPlayerTurn() {
    if (winner === true || tie === true)
        return;
    turn *= -1;
}
