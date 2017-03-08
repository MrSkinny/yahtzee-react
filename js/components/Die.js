import React from 'react';

const dieStyles = {
    outerDieStyles: {
        width: 30,
        height: 30,
        backgroundColor: 'lightblue',
        border: 'solid 1px black',
        margin: 10,
        cursor: 'pointer'
    },
    innerDieStyles: {
        position: 'relative',
        left: '33%',
        top: '28%',
    },
};

const generateOuterStyles = function(onHold, isEndTurn, noRolls) {
    const modifiedStyles = {};
    if (onHold) modifiedStyles.backgroundColor = 'pink';
    if (noRolls) modifiedStyles.backgroundColor = 'lightgray';
    if (isEndTurn) modifiedStyles.border = 'solid 3px black';
    return { ...dieStyles.outerDieStyles, ...modifiedStyles };
};

const Die = ({ id, face, onHold, holdDie, isEndTurn, noRolls }) => {
    const { innerDieStyles } = dieStyles;
    const outerDieStyles = generateOuterStyles(onHold, isEndTurn, noRolls);

    return (
        <div style={outerDieStyles} onClick={() => isEndTurn || noRolls ? null : holdDie(id)}>
            <span style={innerDieStyles}>
                {face}
            </span>
        </div>
    );
};

export default Die;
