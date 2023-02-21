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
const boardEl = document.querySelector('.board');
/*----------------------------- Event Listeners -----------------------------*/
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
function updateMessage() {
    if (!winner && !tie) {
        messageEls.textContent = `It's ${turn === 1 ? "🐈" : "🐈‍⬛"}'s turn!`;
    }
    else if (!winner && tie) {
        messageEls.textContent = 'Tie Game aka cats game Mee-OWW 😸';
    }
    else {
        messageEls.textContent = `Congratulations! ${turn === 1 ? '🐈' : '🐈‍⬛'} wins! `;
    }
    messageEls.classList.add('animate__animated', 'animate__heartBeat');
}
// I HAVE NO IDEA HOW TO DO THIS //Figured it out
function handleClick(evt) {
    const target = evt.target;
    if (!target)
        return;
    const sqrIdx = parseInt(target.id.replace('sqr', ''));
    if (isNaN(sqrIdx) || board[sqrIdx] || winner)
        return;
    placePiece(sqrIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}
function checkForTie() {
    if (board.includes(0))
        return;
    tie = true;
}
function checkForWinner() {
    winningCombos.forEach(combo => {
        if (Math.abs(board[combo[1]] + board[combo[2]]) === 3) {
            winner = true;
        }
    });
}
function switchPlayerTurn() {
    if (winner)
        return;
    turn *= -1;
}
