import React, { Component } from 'react';

import Dice from './Dice';

class App extends Component {
    state = {
        dice: Dice.createDice(),
        turn: 1,
        totalRolls: 0,
    };
    
    onRollDice = () => {
        if (this.state.totalRolls === 3) return false;
        
        this.setState({
            dice: this.state.dice.map(die => {
                return die.onHold ? die : { ...die, face: Dice.randomFace() };
            }),
            totalRolls: this.state.totalRolls + 1
        });
    };
    
    onHoldDie = id => {
        this.setState({
            dice: this.state.dice.map(die => {
                return die.id === id ? { ...die, onHold: !die.onHold } : die;
            })
        });
    };
    
    render() {
        console.log(this.state.dice);
        return (
            <div>
                Total Rolls: {this.state.totalRolls}
                <Dice 
                    dice={this.state.dice}
                    totalRolls={this.state.totalRolls}
                    onRollDice={this.onRollDice} 
                    onHoldDie={this.onHoldDie} 
                />
            </div>
        );
    }
}

export default App;
