const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // linhas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // colunas
  [0, 4, 8],
  [2, 4, 6]  // diagonais
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "Empate! 😐";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = Array(9).fill("");
  statusText.textContent = `Vez do jogador: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
}

// Eventos
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

// Mensagem inicial
statusText.textContent = `Vez do jogador: ${currentPlayer}`;
