/*-------------------------------- Constants --------------------------------*/

const winningCombos: number [][] = [
  [0, 1, 2], //top
  [3, 4, 5], // middle
  [6, 7, 8], // bottom
  [0, 3, 6], // left column
  [1, 4, 7], // middle cloumn
  [2, 5, 8], // right column
  [0, 4, 8], //L-R diagonal
  [2, 4, 6], //R-L diagonal
]

/*---------------------------- Variables (state) ----------------------------*/
//  Define the required variables used to track the state of the game
let board: Array<number | null>, turn: number, winner: boolean ,tie: boolean

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEls = document.getElementById('message')
const resetBtnEl = document.querySelector<HTMLButtonElement>('#reset')!

/*----------------------------- Event Listeners -----------------------------*/
