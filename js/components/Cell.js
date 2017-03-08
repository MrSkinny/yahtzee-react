import React from 'react';

const cellStyles = {
    cursor: 'pointer',
};

const Cell = ({ cat, val, setScore, totalRolls }) => {
    return (
        <td style={cellStyles} onClick={() => setScore(cat)}>{val}</td>
    );
};

export default Cell;
