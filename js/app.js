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
const resetBtnEl = document.querySelector('#reset');
/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('.board')?.addEventListener('click', handleClick);
resetBtnEl?.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
function updateBoard() {
    board.forEach((boardVal, idx) => {
        if (boardVal === 1) {
            squareEls[idx].textContent = '🐈';
        }
        else if (boardVal === -1) {
            squareEls[idx].textContent = '🐈‍⬛';
        }
        else {
            squareEls[idx].textContent = '';
        }
    });
}
function render() {
    // updateBoard()
    // messageEl.classList.remove('animate__animated', 'animate__heartBeat')
    // updateMessage()
}
