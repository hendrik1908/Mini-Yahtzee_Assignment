import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../style/styles';

let board = [];
let numberField = [];
const NBR_OF_DICES = 5;
const NBR_OF_VALUES = 6;
const NBR_OF_THROWS = 3;

export default function Gameboard(){

    const[nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const[status, setStatus] = useState('');
    const[selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const[selectedNumber, setSelectedNumber] = useState(new Array(NBR_OF_VALUES).fill(false));
    const[points, setPoints] = useState('0');
    const[bonusCounter, setBonusCounter] = useState('63');
    const[sum, setSum] = useState(0);

    let resultCounter = [];
    resultCounter.push("0");
    resultCounter.push("0");
    resultCounter.push("0");
    resultCounter.push("0");
    resultCounter.push("0");
    resultCounter.push("0");

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
                            <Text textAlign="center">{resultCounter[i] = sum}</Text>
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
        number[i] = selectedNumber[i] ? false : true;
        setSelectedNumber(number);
    }

    function throwDices(){
        for(let i = 0; i < NBR_OF_DICES; i++){
            if(!selectedDices[i]){
                let randomNumber = Math.floor(Math.random()*6+1);
                board[i] = 'dice-'+randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    function sumSelected(){
        sum = selectedDices.reduce((partialSum, a) => partialSum + a, 0) + !selectedDices.reduce((partialSum, b) => partialSum + b, 0);
        console.log(sum);
        return sum;
    }

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
