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
