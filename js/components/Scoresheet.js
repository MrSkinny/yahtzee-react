import React from 'react';

const Scoresheet = ({ setScore, score, totalRolls }) => {
    return (
        <div>
            <h3>Scores</h3>
            <p>
                {score}
            </p>
            <button disabled={totalRolls !== 3} onClick={setScore}>Place</button>
        </div>
    );
};

export default Scoresheet;