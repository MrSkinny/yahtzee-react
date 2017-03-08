import React, { Component } from 'react';

import Dice from './Dice';
import Scoresheet from './Scoresheet';

class App extends Component {
    state = {
        dice: Dice.createDice(),
        turn: 1,
        totalRolls: 0,
        round: 1,
        score: {
            'Aces': [],
            'Twos': [],
            'Threes': [],
            'Fours': [],
            'Fives': [],
            'Sixes': [],
            'Upper Subtotal': [],
            'Upper Bonus': [],
            'Upper Total': [],
            '3 of a Kind': [],
            '4 of a Kind': [],
            'Full House': [],
            'Small Straight:': [],
            'Large Straight': [],
            'YAHTZEE': [],
            'Chance': [],
            'Lower Total': [],
            'FINAL SCORE': [],
        },
    };
    
    onRollDice = () => {
        if (this.state.totalRolls === 3) return false;
        
        this.setState(prevState => ({
            dice: prevState.dice.map(die => {
                return die.onHold ? die : { ...die, face: Dice.randomFace() };
            }),
            totalRolls: prevState.totalRolls + 1
        }));
    };
    
    onHoldDie = id => {
        this.setState(prevState => ({
            dice: prevState.dice.map(die => {
                return die.id === id ? { ...die, onHold: !die.onHold } : die;
            })
        }));
    };
    
    addTotal(){
        return this.state.dice.reduce((acc, die) => acc + die.face, 0);
    }
    
    countSides(dice, options = {}){
        const _countSides = dice => {
            const counter = {};
            dice.forEach(die => {
                const count = counter[die.face];
                counter[die.face] = count > 0 ? count + 1 : 1;
            });
            return counter;            
        };
        
        const counter = _countSides(dice);
        const keys = Object.keys(counter);
        
        if (options.target) {
            for (let i = 0; i < keys.length; i++){
                if ( counter[keys[i]] >= options.target ) return parseInt(keys[i], 10);
            }
            return -1;
        }
        
        if (options.fullHouse) {
            if (keys.length !== 2) return -1;
            if (counter[keys[0]] === 3 && counter[keys[1]] === 2) return 1;
            if (counter[keys[1]] === 3 && counter[keys[0]] === 2) return 1;
            return -1;
        }
    }
    
    calcScore = category => {
        const dice = this.state.dice;
        switch (category) {
            case 'Aces':
                return dice.reduce((acc, die) => die.face === 1 ? acc + 1 : acc, 0);
            case 'Twos':
                return dice.reduce((acc, die) => die.face === 2 ? acc + 2 : acc, 0);
            case 'Threes':
                return dice.reduce((acc, die) => die.face === 3 ? acc + 3 : acc, 0);
            case 'Fours':
                return dice.reduce((acc, die) => die.face === 4 ? acc + 4 : acc, 0);
            case 'Fives':
                return dice.reduce((acc, die) => die.face === 5 ? acc + 5 : acc, 0);
            case 'Sixes':
                return dice.reduce((acc, die) => die.face === 6 ? acc + 6 : acc, 0);
            case '3 of a Kind':
                return this.countSides(dice, { target: 3 }) !== -1 ? this.addTotal() : 0;
            case '4 of a Kind':
                return this.countSides(dice, { target: 4 }) !== -1 ? this.addTotal() : 0;
            case 'Full House':
                return this.countSides(dice, { fullHouse: true }) !== -1 ? 25 : 0;
            default:
                return 0;
        }
    };
    
    setScore = (category) => {
        const upperKeys = ['Aces', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes'];
        const round = this.state.round - 1;
        
        if (this.state.totalRolls === 3 && this.state.score[category][round] === undefined) {
            const score = this.calcScore(category);
            this.setState(prevState => {
                const shouldUpdateUpper = upperKeys.includes(category);
                let newScore = {
                    ...prevState.score,
                    [category]: [ ...prevState.score[category], score ],
                };

                newScore = shouldUpdateUpper ?
                    { 
                        ...newScore, 
                        'Upper Subtotal': [
                            ...prevState.score['Upper Subtotal'].slice(0, round),
                            upperKeys.reduce((acc, key) => {
                                const val = prevState.score[key][round];
                                if (val !== undefined) return acc + val;
                                return acc;
                            }, score),
                            ...prevState.score['Upper Subtotal'].slice(round + 1),
                        ]
                    } : newScore;
                
                return {
                    totalRolls: 0,
                    turn: prevState.turn + 1,
                    dice: Dice.createDice(),
                    score: newScore,
                };
            });
        }
    };
    
    render() {
        return (
            <div>
                <p>
                    Round: {this.state.round}<br />
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
                    round={this.state.round}
                />
            </div>
        );
    }
}

export default App;
