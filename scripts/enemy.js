import { game } from "./game.js";

export const enemy = (() => {
    const attackDelay = 500;

    function attack() {
        // Randomize target cell index
        let target = Math.floor(Math.random() * 100);

        // Randomize if target cell has already been hit
        while (game.gameboards[0].grid[target].isHit) {
            target = Math.floor(Math.random() * 100);
        }

        // If target was a ship, hit again
        if (game.gameboards[0].hit(target)) setTimeout(attack, attackDelay);
    }

    return {
        attack,
        attackDelay
    }
})();