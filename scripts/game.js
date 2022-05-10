import Gameboard from "./gameboard.js";
import { enemy } from "./enemy.js";
import { deleteGameboards } from "./display.js";

// Main game function
export const game = (() => {
    let isGameOver = false;
    let turn = 1;
    const getTurn = () => turn;
    let gameboards = [];

    startNewGame();
    
    // Advance turn
    function nextTurn() {
        turn++;
        if (turn % 2 === 0) {
            setTimeout(enemy.attack, enemy.attackDelay);
        }
    }

    function startNewGame() {
        isGameOver = false;
        turn = 1;
        gameboards = [];
        deleteGameboards();

        gameboards.push(new Gameboard(gameboards.length));
        gameboards.push(new Gameboard(gameboards.length));

        gameboards[0].addShips();
        gameboards[0].drawShips();
        gameboards[1].addShips();
    }

    return {
        isGameOver,
        gameboards,
        nextTurn,
        getTurn,
        startNewGame
    }
})();
