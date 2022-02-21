import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../style/styles';

let board = [];
let diceNumbers = [];
let numberField = [];
const NBR_OF_DICES = 5;
const NBR_OF_VALUES = 6;
const NBR_OF_THROWS = 3;
let resultCounter = [0, 0, 0, 0, 0, 0];


export default function Gameboard(){

    const[nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const[status, setStatus] = useState('');
    const[selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const[selectedNumber, setSelectedNumber] = useState(new Array(NBR_OF_VALUES).fill(false));
    const[points, setPoints] = useState('0');
    const[bonusCounter, setBonusCounter] = useState('63');
    const[sum, setSum] = useState(0);

    //let resultCounter = [0, 0, 0, 0, 0, 0];

    numberField.push("numeric-1-circle");
    numberField.push("numeric-2-circle");
    numberField.push("numeric-3-circle");
    numberField.push("numeric-4-circle");
    numberField.push("numeric-5-circle");
    numberField.push("numeric-6-circle");

    const row = [];
    for(let i = 0; i<NBR_OF_DICES; i++){
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
                    <MaterialCommunityIcons
                        name={board[i]}
                        key={"row" + i}
                        size={50}
                        color={getDiceColor(i)}>
                    </MaterialCommunityIcons>
            </Pressable>
        )
    }

    const numbers = [];
    for (let i = 0; i < NBR_OF_VALUES; i++) {
        numbers.push(
            <View>
                <Grid>
                    <Col>
                        <Row>
                            <Text textAlign="center">{resultCounter[i]}</Text>
                        </Row>
                        <Row>
                            <Pressable
                                key={"numbers" + i}
                                onPress={() => selectNumber(i)}>
                                <MaterialCommunityIcons
                                    name={numberField[i]}
                                    key={"numbers" + i}
                                    size={30}
                                    color={getNumberColor(i)}>
                                </MaterialCommunityIcons>
                            </Pressable>
                        </Row>
                    </Col>
                </Grid>
            </View>
        )
    }

    useEffect(() => {
        checkWinner();
        if(nbrOfThrowsLeft === NBR_OF_THROWS){
            setStatus('Game has not started');
        }
        else if(nbrOfThrowsLeft < 0){
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [nbrOfThrowsLeft]);
    
    function getDiceColor(i){
        if(board.every((val, i, arr) => val === arr[0])){
            return "orange";
        }
        else{
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

    function getNumberColor(i){
        // if(numberField.every((val, i, arr) => val === arr[0])){
        //     return "orange";
        // }
        // else{
        //     return selectedNumber[i] ? "black" : "steelblue";
        // }

        return selectedNumber[i] ? "black" : "steelblue";
    }

    function selectDice(i){
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function selectNumber(i){

        let number = [...selectedNumber];
        // number[i] = selectedNumber[i] ? false : true;
        number[i] = selectedNumber[i] = true;
        setSelectedNumber(number);

        // if(selectedNumber === 0){
        //     resultCounter[0] //diceNumbers Array durchsuchen nach einsen und diese addieren, anschließend resultCounter[0] hinzufügen
        // }
        /*
        const counter = {};
        diceNumbers.forEach((x) => {
            counter[x] = (counter[x] || 0) + 1;
        })
        console.log(counter);
        */

       let tempSum = 0;
       for (let x = 0; x <= diceNumbers.length; x++) {
            if (diceNumbers[x] === (i + 1)) {
                tempSum += diceNumbers[x];
            }
       }
       console.log(tempSum, i);
       resultCounter[i] = tempSum;
    }

    function throwDices(){
        for(let i = 0; i < NBR_OF_DICES; i++){
            if(!selectedDices[i]){
                let randomNumber = Math.floor(Math.random()*6+1);
                board[i] = 'dice-'+randomNumber;
                diceNumbers[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        //calculate();
    }

    // function calculate(){
    //     for(let i = 0; i<NBR_OF_DICES; i++){
    //         if(diceNumbers[i] === 1){
    //             resultCounter[i] += 1;
    //         } else if(diceNumbers[i] === 2){
    //             resultCounter[i] = resultCounter[i] +2;
    //         } else if(diceNumbers[i] === 3){
    //             resultCounter[i] = resultCounter[i] +3;
    //         } else if(diceNumbers[i] === 4){
    //             resultCounter[i] = resultCounter[i] +4;
    //         } else if(diceNumbers[i] === 5){
    //             resultCounter[i] = resultCounter[i] +5;
    //         } else{
    //             resultCounter[i] = resultCounter[i] +6;
    //         }
    //     }
    //     console.log(resultCounter);
    //     return resultCounter;
    // }

    function checkWinner(){
        if(board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0){
            setStatus('You won');
        }
        else if(board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0){
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if(nbrOfThrowsLeft === 0){
            setStatus('Game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else{
            setStatus('Keep on throwing');
        }
    }

    return(
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button} onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    Throw dices
                </Text>
            </Pressable>
            <Text style={styles.gameinfo}>Total: {points}</Text>
            <Text style={styles.gameinfo}>You are {bonusCounter} points away from bonus.</Text>
            <View style={styles.flex}>{numbers}</View>
        </View>
    )
}
