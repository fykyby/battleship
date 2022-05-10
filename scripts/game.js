import Gameboard from "./gameboard.js";
import { enemy } from "./enemy.js";
import { deleteGameboards, hideGameOverScreen } from "./display.js";

// Main game function
export const game = (() => {
    let isGameOver = false;
    const getIsGameOver = () => isGameOver;
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
        turn = 1;
        
        deleteGameboards();
        gameboards.length = 0;
        gameboards.push(new Gameboard(gameboards.length));
        gameboards.push(new Gameboard(gameboards.length));
        
        gameboards[0].addShips();
        gameboards[0].drawShips();
        gameboards[1].addShips();
        
        hideGameOverScreen();

        isGameOver = false;
    }

    return {
        getIsGameOver,
        gameboards,
        nextTurn,
        getTurn,
        startNewGame
    }
})();
