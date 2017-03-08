import React from 'react';

import Die from './Die';

const Dice = ({ dice, totalRolls, onRollDice, onHoldDie }) => {
    return (
        <div>
            <button disabled={totalRolls === 3} onClick={onRollDice}>Roll Dice</button>
            {dice.map(die => 
                <Die 
                    key={die.id} 
                    {...die} 
                    holdDie={onHoldDie} 
                    noRolls={totalRolls === 0} 
                    isEndTurn={totalRolls === 3} 
                />
            )}
        </div>
    );
};

Dice.randomFace = function() {
    return Math.floor(Math.random() * 6) + 1;
};

Dice.createDice = function() {
    const dice = [];
    for (let i = 1; i < 6; i++) {
        dice.push({
            id: i,
            face: Dice.randomFace(),
            onHold: false
        });
    }
    return dice;
};

export default Dice;
