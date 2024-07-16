document.addEventListener("DOMContentLoaded", function() {
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

    /*---------------------------- Variables (state) ----------------------------*/
    let board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
      ]
      
    let turn = "red";
    let winner = false;
    let tie = false;

    /*------------------------ Cached Element References ------------------------*/
    const squareEls = document.querySelectorAll(".sqr");
    const messageEl = document.querySelector("#message");
    const restartButton = document.querySelector("#restartButton");
    const boardEl = document.querySelector(".board");

    /*-------------------------------- Functions --------------------------------*/
    function init() {
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

    function render() {
        updateBoard();
        updateMessage();
    }

    function updateBoard() {
        

