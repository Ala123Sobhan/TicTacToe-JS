/*------ constants ------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*------ app state variables ------*/

let board;
let turn = "X";
let win;
let flag;
/*------ cached element references ------*/

const squares = Array.from(document.querySelectorAll("#board div"));
const messages = document.querySelector("h2");

/*------ event listeners ------*/

document.getElementById("board").addEventListener("click", handleTurn);

document.getElementById("reset-button").addEventListener("click", start);

start();
/*------ functions ------*/

function getWinner() {
  let winner = null;
  winningCombos.forEach(function (combo, index) {
    if (
      board[combo[0]] !== null &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
    }
  });
  if (winner) {
    return winner;
  } else if (board.includes("")) {
    return null;
  } else return "T";
}

function handleTurn() {
  let idx = squares.findIndex(function (square) {
    return square === event.target;
  });

  board[idx] = turn;
  turn = turn === "X" ? "O" : "X";
  win = getWinner();
  render();
}

function start() {
  // initialize a new game
  document.getElementById("board").addEventListener("click", handleTurn);

  console.log("in start");

  board = ["", "", "", "", "", "", "", "", ""];
  console.log(board);
  messages.textContent = `it's ${turn}'s turn`;
  render();
}

function render() {
  console.log(board);
  board.forEach((mark, index) => {
    squares[index].textContent = mark;
  });

  if (win === "T") {
    console.log("in tie");
    messages.textContent = "That's a tie!!";
    win = null;
    alert("Reset to play more!");
  } else if (win) {
    console.log("in win");
    messages.textContent = `${win} won the game!!`;
    win = null;
    alert("Reset to play more!");
  } else {
    console.log("in turn");
    messages.textContent = `It's ${turn}'s turn !`;
  }
}
start();
