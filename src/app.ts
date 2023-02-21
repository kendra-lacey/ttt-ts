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
let board: Array<number>,
turn: number, 
winner: boolean,
tie: boolean

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEls = document.getElementById('message')
const resetBtnEl = document.querySelector<HTMLButtonElement>('#reset')!
const gameBoard = document.querySelector('.board')

/*----------------------------- Event Listeners -----------------------------*/
gameBoard?.addEventListener('click', handleClick)
resetBtnEl?.addEventListener('click',init)

/*-------------------------------- Functions --------------------------------*/

function init(): void {
  board = [0,0,0,0,0,0,0,0,0,];
  turn = 1;
  winner = false;
  tie = false ;
  render()
}
function placePiece(idx: number): void {
  board[idx] = turn
}

function updateBoard(){
  board.forEach((boardVal: number , idx: number) => {
    if (boardVal === 1) {
      squareEls[idx].textContent = '🐈'
    } else if (boardVal === -1) {
      squareEls[idx].textContent = '🐈‍⬛'
    } else {
      squareEls[idx].textContent = ''
    }
  })
}

function updateMessage(): void {
  if(!winner && !tie){
    messageEls!.textContent = `It's ${turn === 1 ? "🐈":"🐈‍⬛"}'s turn!`
  } else if (!winner && tie) {
    messageEls!.textContent = 'Tie Game aka cats game Mee-OWW 😸'
  } else {
    messageEls!.textContent =  `Congratulations! ${turn === 1 ? '🐈' : '🐈‍⬛'} wins! `
  }
  messageEls!.classList.add('animate__animated', 'animate__heartBeat')
}
// I HAVE NO IDEA HOW TO DO THIS 
// function handleClick(evt: MouseEvent): void {
//   const target = evt.target as HTMLElement
//   if (!target) return

//   const sqIdx: number = parseInt(target.id.replace('sq', ''))
//   if (isNaN(sqIdx) || board[sqIdx] || winner) return
//   placePiece(sqIdx)
//   checkForTie()
//   checkForWinner()
//   switchPlayerTurn()
//   render()
// }
function handleClick(evt) { // wants to explicty define it as MouseEvent idk
  if (!evt.target)
      return;
  const target = evt.target;
  const sqIdx = parseInt(target.id.replace('sq', ''));
  if (isNaN(sqIdx) || board[sqIdx] || winner)
      return;
  placePiece(sqIdx);
  checkForTie();
  checkForWinner();
  switchPlayerTurn();
  render();
}

function checkForTie(): void {
  if (board.includes(0)) return
  tie = true
}

function checkForWinner(): void {
  winningCombos.forEach(combo => {
    if (Math.abs(board[combo[1]] + board[combo[2]]) === 3){
      winner = true
    }
  })
}
function switchPlayerTurn(): void {
  if (winner) return 
  turn *= -1
}

function render(): void {
  updateBoard()
  messageEls!.classList.remove('animate__animated', 'animate__heartBeat')
  updateMessage()
}