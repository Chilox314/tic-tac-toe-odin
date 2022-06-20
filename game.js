const player = (mark, playerName) => {
    const name = playerName;
    const marker = mark;
    return {name, marker};
};

const dummyX = player("x","playerX");
const dummyO = player("o","playerO");

const gameBoard = (() => {
    let currentGameBoard = ["e","e","e","e","e","e","e","e","e"]; //[tl,tm,tr,ml,mm,mr,bl,bm,br] e=empty,x=x,o=o

    const logGame = () => {
        console.log(currentGameBoard);
    };

    const placeX = (pos) => {
        currentGameBoard[pos] = "x";
    };

    const placeO = (pos) => {
        currentGameBoard[pos] = "o";
    };

    return {
        placeX,
        placeO,
        logGame,
    };
})();

const game = (() => {
    let currentTurn = "x";

    let inputField = document.querySelectorAll(".gameInput");

    inputField.forEach((field, index) => {

        field.addEventListener("click", () => {
            if (currentTurn === "x") {
                gameBoard.placeX(index);
                field.textContent = "x";
                currentTurn = "o";
                console.log("placed x");
            }
            else if (currentTurn === "o") {
                gameBoard.placeO(index);
                field.textContent = "o";
                currentTurn = "x";
                console.log("placed o")
            }
        });

    });

})();