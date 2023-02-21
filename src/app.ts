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
let board: number[],
turn: number, 
winner: boolean,
tie: boolean

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll<HTMLDivElement>('.sqr')
const messageEls = document.getElementById('message') as HTMLHeadingElement
const resetBtnEl = document.getElementById('reset') as HTMLButtonElement
const boardEl = document.querySelector<HTMLElement>('.board')!

/*----------------------------- Event Listeners -----------------------------*/
init()
boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click',init)

/*-------------------------------- Functions --------------------------------*/

function init(): void {
  board = [0,0,0,0,0,0,0,0,0,];
  turn = 1;
  winner = false;
  tie = false ;
  render()
}

function render(): void {
  updateBoard()
  messageEls!.classList.remove('animate__animated', 'animate__heartBeat')
  updateMessage()
}

function placePiece(idx: number): void {
  board[idx] = turn
}

function updateBoard(){
  squareEls.forEach((square, idx) => {
    if (board[idx] === 1) {
      square.textContent = '🐈'
    } else if (board[idx] === -1) {
      square.textContent = '🐈‍⬛'
    } else if (board[idx] === 0) {
      square.textContent = ''
    }
  })
}

function updateMessage(): void {
  if(!winner && !tie){
    messageEls!.textContent = `It's ${turn === 1 ? "🐈":"🐈‍⬛"}'s turn!`
  } else if (!winner && tie) {
    messageEls!.textContent = 'Tie Game aka cats game Mee-OWW 😸'
  } else {
    messageEls!.textContent =  `Congratulations! ${turn === 1 ? '🐈' : '🐈‍⬛'} wins 🎉! `
  }
  messageEls!.classList.add('animate__animated', 'animate__heartBeat')
}
// I HAVE NO IDEA HOW TO DO THIS //Figured it out
function handleClick(evt: MouseEvent): void {
  if(!(evt.target instanceof HTMLElement)) return
  if(evt.target.textContent !== '') return
  if(winner === true || tie === true) return
  let sqIdx: number = parseInt(evt.target.id.slice(2))
  // console.log(evt.target.id)
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}


function checkForTie(): void {
  if (!board.includes(0)) {
  tie = true
}
}

function checkForWinner(): void {
  winningCombos.forEach(combo => {
    let total: number = 0 
    combo.forEach(position => {
      total += board[position]
      if (Math.abs(total) === 3) {
        winner = true
        return
      }
    })
  })
}

function switchPlayerTurn(): void {
  if (winner === true || tie === true) return 
  turn *= -1
}
