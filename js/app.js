document.addEventListener("DOMContentLoaded", function () {
    /*-------------------------------- Constants --------------------------------*/
    const winningCombos = [
        // Horizontal win conditions
        [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 1], [0, 2], [0, 3], [0, 4]], [[0, 2], [0, 3], [0, 4], [0, 5]], [[0, 3], [0, 4], [0, 5], [0, 6]],
        [[1, 0], [1, 1], [1, 2], [1, 3]], [[1, 1], [1, 2], [1, 3], [1, 4]], [[1, 2], [1, 3], [1, 4], [1, 5]], [[1, 3], [1, 4], [1, 5], [1, 6]],
        [[2, 0], [2, 1], [2, 2], [2, 3]], [[2, 1], [2, 2], [2, 3], [2, 4]], [[2, 2], [2, 3], [2, 4], [2, 5]], [[2, 3], [2, 4], [2, 5], [2, 6]],
        [[3, 0], [3, 1], [3, 2], [3, 3]], [[3, 1], [3, 2], [3, 3], [3, 4]], [[3, 2], [3, 3], [3, 4], [3, 5]], [[3, 3], [3, 4], [3, 5], [3, 6]],
        [[4, 0], [4, 1], [4, 2], [4, 3]], [[4, 1], [4, 2], [4, 3], [4, 4]], [[4, 2], [4, 3], [4, 4], [4, 5]], [[4, 3], [4, 4], [4, 5], [4, 6]],
        [[5, 0], [5, 1], [5, 2], [5, 3]], [[5, 1], [5, 2], [5, 3], [5, 4]], [[5, 2], [5, 3], [5, 4], [5, 5]], [[5, 3], [5, 4], [5, 5], [5, 6]],
        // Vertical win conditions
        [[0, 0], [1, 0], [2, 0], [3, 0]], [[1, 0], [2, 0], [3, 0], [4, 0]], [[2, 0], [3, 0], [4, 0], [5, 0]],
        [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 1], [2, 1], [3, 1], [4, 1]], [[2, 1], [3, 1], [4, 1], [5, 1]],
        [[0, 2], [1, 2], [2, 2], [3, 2]], [[1, 2], [2, 2], [3, 2], [4, 2]], [[2, 2], [3, 2], [4, 2], [5, 2]],
        [[0, 3], [1, 3], [2, 3], [3, 3]], [[1, 3], [2, 3], [3, 3], [4, 3]], [[2, 3], [3, 3], [4, 3], [5, 3]],
        [[0, 4], [1, 4], [2, 4], [3, 4]], [[1, 4], [2, 4], [3, 4], [4, 4]], [[2, 4], [3, 4], [4, 4], [5, 4]],
        [[0, 5], [1, 5], [2, 5], [3, 5]], [[1, 5], [2, 5], [3, 5], [4, 5]], [[2, 5], [3, 5], [4, 5], [5, 5]],
        [[0, 6], [1, 6], [2, 6], [3, 6]], [[1, 6], [2, 6], [3, 6], [4, 6]], [[2, 6], [3, 6], [4, 6], [5, 6]],
        // Diagonal win conditions (bottom-left to top-right)
        [[2, 0], [3, 1], [4, 2], [5, 3]], [[1, 0], [2, 1], [3, 2], [4, 3]], [[2, 1], [3, 2], [4, 3], [5, 4]], [[0, 0], [1, 1], [2, 2], [3, 3]], [[1, 1], [2, 2], [3, 3], [4, 4]], [[2, 2], [3, 3], [4, 4], [5, 5]], [[0, 1], [1, 2], [2, 3], [3, 4]], [[1, 2], [2, 3], [3, 4], [4, 5]], [[2, 3], [3, 4], [4, 5], [5, 6]], [[0, 2], [1, 3], [2, 4], [3, 5]], [[1, 3], [2, 4], [3, 5], [4, 6]], [[0, 3], [1, 4], [2, 5], [3, 6]],
        // Diagonal win conditions (top-left to bottom-right)
        [[3, 0], [2, 1], [1, 2], [0, 3]], [[4, 0], [3, 1], [2, 2], [1, 3]], [[3, 1], [2, 2], [1, 3], [0, 4]], [[5, 0], [4, 1], [3, 2], [2, 3]], [[4, 1], [3, 2], [2, 3], [1, 4]], [[3, 2], [2, 3], [1, 4], [0, 5]], [[5, 1], [4, 2], [3, 3], [2, 4]], [[4, 2], [3, 3], [2, 4], [1, 5]], [[3, 3], [2, 4], [1, 5], [0, 6]], [[5, 2], [4, 3], [3, 4], [2, 5]], [[4, 3], [3, 4], [2, 5], [1, 6]], [[5, 3], [4, 4], [3, 5], [2, 6]]
    ];
    const playerWins = {
        playerRed: 0,
        playerYellow: 0
    }

    /*---------------------------- Variables (state) ----------------------------*/
    let board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ];
    let turn = "red";
    let winner = false;
    let tie = false;

    /*------------------------ Cached Element References ------------------------*/
    const squareEls = document.querySelectorAll(".sqr");
    const messageEl = document.querySelector("#message");
    const restartButton = document.querySelector("#restartButton");
    const boardEl = document.querySelector(".board");
    const loadingScreen = document.querySelector("#loading-screen");
    const playFriendsButton = document.querySelector("#play-friends-button");
    const playAIButton = document.querySelector("#play-ai-button");
    const playerWinEl = document.querySelector(".playerWin")

    /*-------------------------------- Functions --------------------------------*/
    function init() {
        loadingScreen.style.display = 'flex';
        board = [
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""]
        ];
        turn = "red";
        winner = false;
        tie = false;
        render();
    }
    // Update the display
    function render() {
        updateBoard();
        updateMessage();
    }
    // Update the board display
    function updateBoard() {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellEl = document.querySelector(`[data-cell="${rowIndex}-${colIndex}"]`);
                cellEl.classList.remove("red", "yellow");
                if (cell) {
                    cellEl.classList.add(cell);
                }
            });
        });
    }
    function startGameAgainstFriends() {
        loadingScreen.style.display = 'none';
    }
    // used chatGpt for function.


    function startGameAgainstAI() {
        loadingScreen.style.display = 'none';

        function makeAIMove() {
            if (winner || tie) return;

            let availableColumns = [];
            for (let col = 0; col < 7; col++) {
                if (board[0][col] === "") {
                    availableColumns.push(col);
                }
            }

            if (availableColumns.length === 0) return;

            const randomCol = availableColumns[Math.floor(Math.random() * availableColumns.length)];
            playPiece(randomCol);
            checkForWinner();
            checkForTie();
            switchPlayerTurn();
            render();
        }

    }


    // Update the message display
    function updateMessage() {
        if (!winner && !tie) {
            messageEl.textContent = `${turn.charAt(0).toUpperCase() + turn.slice(1)}'s turn`;
        } else if (tie) {
            messageEl.textContent = "It's a tie!";
        } else {
            messageEl.textContent = `${turn.charAt(0).toUpperCase() + turn.slice(1)} wins!`;
            if (turn.charAt(0).toUpperCase() + turn.slice(1) === "Red") {
                playerWins.playerRed = playerWins.playerRed + 1
                console.log(playerWins.playerRed)

            } else {
                playerWins.playerYellow = playerWins.playerYellow + 1

                console.log(playerWins.playerYellow)
            }
            playerWinEl.innerText = `Red wins; ${playerWins.playerRed} \n Yellow wins; ${playerWins.playerYellow}`
            // Got help from chatGpt for the function expression.

        }
    }
    // Handle a click on the board
    function handleClick(event) {
        const colIndex = event.target.getAttribute('data-cell').split('-')[1];
        if (winner) return;
        playPiece(colIndex);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
    }
    // Place a piece in the chosen column
    function playPiece(colIndex) {
        for (let rowIndex = board.length - 1; rowIndex >= 0; rowIndex--) {
            if (!board[rowIndex][colIndex]) {
                board[rowIndex][colIndex] = turn;
                break;
            }
        }
    }
    // Check for a winner
    function checkForWinner() {
        for (let combo of winningCombos) {
            const [a, b, c, d] = combo;
            if (
                board[a[0]][a[1]] &&
                board[a[0]][a[1]] === board[b[0]][b[1]] &&
                board[a[0]][a[1]] === board[c[0]][c[1]] &&
                board[a[0]][a[1]] === board[d[0]][d[1]]
            ) {
                winner = true;
                return;
            }
        }
    }
    // Check for a tie
    function checkForTie() {
        if (board.flat().every(cell => cell) && !winner) {
            tie = true;
        }
    }
    // Switch to the next player's turn
    function switchPlayerTurn() {
        if (winner) return;
        turn = turn === "red" ? "yellow" : "red";
    }

    /*----------------------------- Event Listeners -----------------------------*/
    boardEl.addEventListener("click", handleClick);
    restartButton.addEventListener("click", init);
    playFriendsButton.addEventListener("click", startGameAgainstFriends);
    playAIButton.addEventListener("click", startGameAgainstAI);

    /*-------------------------------- Initialization --------------------------------*/
    init();
});

