const player = (mark, playerName) => {
    const name = playerName;
    const marker = mark;
    return {name, marker};
};

const gameBoard = (() => {
    let currentGameBoard = ["e","e","e","e","e","e","e","e","e"]; //[tl,tm,tr,ml,mm,mr,bl,bm,br] e=empty,x=x,o=o

    let winningPatterns =  {
                            1:[0,1,2],  //horizontal wins
                            2:[3,4,5],
                            3:[6,7,8],
                            4:[0,3,6],  //vertical wins
                            5:[1,4,7],
                            6:[2,5,8],
                            7:[0,4,8],  //diagonal wins
                            8:[2,4,6]
                            };                    

    const logGame = () => {
        console.log(currentGameBoard);
    };

    const placeX = (pos) => {
        currentGameBoard[pos] = "x";
    };

    const placeO = (pos) => {
        currentGameBoard[pos] = "o";
    };

    const resetGameBoard = () => {currentGameBoard = ["e","e","e","e","e","e","e","e","e"]};

    const checkForWin = () => {
        let isGameWon = false;

        for (const x in winningPatterns) { //loops through possible winning patterns and checks currentGameBoard for them
            if (    
                currentGameBoard[winningPatterns[x][0]] === currentGameBoard[winningPatterns[x][1]] && 
                currentGameBoard[winningPatterns[x][0]] === currentGameBoard[winningPatterns[x][2]] &&
                currentGameBoard[winningPatterns[x][0]] !== "e"
                ) {
                    if (currentGameBoard[winningPatterns[x][0]] === "x") {
                        isGameWon = true;
                        game.end("x", true);
                    } else if (currentGameBoard[winningPatterns[x][0]] === "o") {
                        isGameWon = true;
                        game.end("o", true);
                    }
                    break;
                }
            };
        if (!isGameWon && checkForTie()) {
            game.end("e", false);
        };
    };

    const checkForTie = () => {
        if (
            currentGameBoard[0] !== "e" &&
            currentGameBoard[1] !== "e" &&
            currentGameBoard[2] !== "e" &&
            currentGameBoard[3] !== "e" &&
            currentGameBoard[4] !== "e" &&
            currentGameBoard[5] !== "e" &&
            currentGameBoard[6] !== "e" &&
            currentGameBoard[7] !== "e" &&
            currentGameBoard[8] !== "e"
        ) {
            return true;
        } else {
            return false;
        };
    };

    return {
        placeX,
        placeO,
        logGame,
        resetGameBoard,
        checkForWin,
    };
})();

const game = (() => {
    let currentTurn = "x";
    let playerX;
    let playerO;
    
    const start = () => {
        initPlayerNames();
        reset();

        let inputField = document.querySelectorAll(".gameInput");
        
        inputField.forEach((field, index) => {
            
            field.addEventListener("click", function eventListener() {
                //checks who's turn it is and if the field is taken
                if (currentTurn === "x" && field.textContent === "") {
                    gameBoard.placeX(index);
                    field.textContent = "x";
                    currentTurn = "o";
                    console.log("placed x");
                    gameBoard.checkForWin();
                }
                else if (currentTurn === "o" && field.textContent === "") {
                    gameBoard.placeO(index);
                    field.textContent = "o";
                    currentTurn = "x";
                    console.log("placed o");
                    gameBoard.checkForWin();
                };
            });
            
        });
    };
    
    const end = (winningMarker,isGameWon) => {
        nameInputO.disabled = false;
        nameInputX.disabled = false;

        if (isGameWon) {
            const gameBoardDOM = document.getElementById("gameBoard");

            gameBoardDOM.replaceWith(gameBoardDOM.cloneNode(true));

            if (playerX.marker === winningMarker) {
                winnerOutput.textContent = `${playerX.name} has won with X`;
            }
            else if (playerO.marker === winningMarker) {
                winnerOutput.textContent = `${playerO.name} has won with O`;
            };
        }
        else {
            winnerOutput.textContent = "It's a tie! Try again"
        }
    };

    const reset = () => {
        let inputField = document.querySelectorAll(".gameInput");
        console.log("reset");
        inputField.forEach((field) => {field.replaceWith(field.cloneNode(false))});
        currentTurn = "x";
        gameBoard.resetGameBoard();
        winnerOutput.textContent = "";
    };

    const initPlayerNames = () => {
        let playerXName;
        let playerOName;

        if(nameInputX.value === ""){
            playerXName = "PlayerX"
        } else {
            playerXName = nameInputX.value;
        };

        if(nameInputO.value === "") {
            playerOName = "Player O";
        } else {
            playerOName = nameInputO.value;
        };

        playerO = player("o", playerOName);
        playerX = player("x", playerXName);

        console.log(playerO, playerX);

        nameInputX.disabled = true;
        nameInputO.disabled = true;
    };

    //buttons, output and inputs
    const resetBtn = document.getElementById("resetBtn");
    resetBtn.addEventListener("click", () => start());

    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", () => start());

    const nameInputX = document.getElementById("playerXName");
    const nameInputO = document.getElementById("playerOName");

    const winnerOutput = document.getElementById("winnerOutput");

    return {
        end
    }
})();