import React from 'react';

import Cell from './Cell';

const createRows = function({score, round, setScore, totalRolls}) {
    const orderedKeys = [ 'Aces', 'Twos', 'Threes', 'Fours', 'Fives', 
        'Sixes', 'Upper Subtotal', 'Upper Bonus', 'Upper Total', '3 of a Kind', '4 of a Kind',
        'Full House', 'Small Straight:', 'Large Straight', 'YAHTZEE', 'Chance',
        'Lower Total', 'FINAL SCORE'
    ];
    const length = orderedKeys.length;
    const rows = [];
    
    for (let i = 0; i < length; i++) {
        const key = orderedKeys[i];
        rows.push(
            <tr key={key}>
                <td>{key}</td>
                <Cell 
                    key={key} 
                    cat={key} 
                    val={score[key][round - 1]}
                    setScore={setScore}
                    totalRolls={totalRolls}
                />
            </tr>
        );
    }
    return rows;
};

const Scoresheet = ({ setScore, round, score, totalRolls }) => {
    return (
        <div>
            <h3>Scores</h3>
            <table style={{border: '1px solid black', padding: 2}}>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows({score, round, setScore, totalRolls})}
                </tbody>
            </table>
        </div>
    );
};

export default Scoresheet;