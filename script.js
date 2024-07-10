document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");
    const messageScreen = document.getElementById("message-screen");
    const messageElement = document.getElementById("message");
    const closeMessageButton = document.getElementById("close-message");
    let currentPlayer = "X";
    let gameActive = true;
    const boardState = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const index = cell.getAttribute("data-index");
            if (gameActive && boardState[index] === "") {
                boardState[index] = currentPlayer;
                cell.textContent = currentPlayer;
                if (checkWin()) {
                    showMessage(`${currentPlayer} wins!`);
                    gameActive = false;
                } else if (boardState.every(cell => cell !== "")) {
                    showMessage("It's a draw!");
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    });

    restartButton.addEventListener("click", () => {
        boardState.fill("");
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        gameActive = true;
    });

    closeMessageButton.addEventListener("click", () => {
        messageScreen.classList.add("hidden");
        restartGame();
    });

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    }

    function showMessage(message) {
        messageElement.textContent = message;
        messageScreen.classList.remove("hidden");
    }

    function restartGame() {
        boardState.fill("");
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        gameActive = true;
    }
});
