import React, { Component } from 'react';

import Dice from './Dice';
import Scoresheet from './Scoresheet';

class App extends Component {
    state = {
        dice: Dice.createDice(),
        turn: 1,
        totalRolls: 0,
        score: null,
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
    
    setScore = () => {
        if (this.state.totalRolls === 3) {
            this.setState({
                score: this.state.dice.reduce((acc, die) => acc + die.face, 0),
                totalRolls: 0,
                turn: this.state.turn + 1,
                dice: Dice.createDice(),
            });
        }
    };
    
    render() {
        console.log(this.state.dice);
        return (
            <div>
                <p>
                    Turn: {this.state.turn}<br />
                    Roll: {this.state.totalRolls}
                </p>
                <Dice 
                    dice={this.state.dice}
                    totalRolls={this.state.totalRolls}
                    onRollDice={this.onRollDice} 
                    onHoldDie={this.onHoldDie} 
                />
                <Scoresheet 
                    setScore={this.setScore} 
                    score={this.state.score} 
                    totalRolls={this.state.totalRolls}
                />
            </div>
        );
    }
}

export default App;
