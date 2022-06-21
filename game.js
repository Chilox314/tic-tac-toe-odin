const player = (mark, playerName) => {
    const name = playerName;
    const marker = mark;
    return {name, marker};
};

const dummyX = player("x","playerX");
const dummyO = player("o","playerO");

const gameBoard = (() => {
    let currentGameBoard = ["e","e","e","e","e","e","e","e","e"]; //[tl,tm,tr,ml,mm,mr,bl,bm,br] e=empty,x=x,o=o

    let winningPatterns =  {
                            1:[0,1,2],
                            2:[3,4,5],
                            3:[6,7,8],
                            4:[0,3,6],
                            5:[1,4,7],
                            6:[2,5,8],
                            7:[0,4,8],
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

    const resetIt = () => {currentGameBoard = ["e","e","e","e","e","e","e","e","e"]};

    const checkForWin = () => {
        for (const x in winningPatterns) { //loops through possible winning patterns and checks currentGameBoard for them
            if (    
                currentGameBoard[winningPatterns[x][0]] === currentGameBoard[winningPatterns[x][1]] && 
                currentGameBoard[winningPatterns[x][0]] === currentGameBoard[winningPatterns[x][2]] &&
                currentGameBoard[winningPatterns[x][0]] !== "e"
                ) {
                console.log("a"); //logic for winner
                break;
            };
        };
    };

    return {
        placeX,
        placeO,
        logGame,
        resetIt,
        checkForWin,
    };
})();

const game = (() => {
    let currentTurn = "x";

    let inputField = document.querySelectorAll(".gameInput");

    inputField.forEach((field, index) => {

        field.addEventListener("click", () => {
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

    const reset = () => {
        inputField.forEach((field) => field.textContent = "");
        currentTurn = "x";
        gameBoard.resetIt();
    };
    return {
        reset,
    }
})();