import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Pressable, ScrollView} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/styles';

let board = [];
let diceNumbers = [];
const NBR_OF_DICES = 5;
const NBR_OF_VALUES = 6;
const NBR_OF_THROWS = 3;
let resultCounter = [0, 0, 0, 0, 0, 0];
let tempCounter = 0;


export default function Gameboard(){

    const[nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const[status, setStatus] = useState('');
    const[selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const[selectedNumber, setSelectedNumber] = useState(new Array(NBR_OF_VALUES).fill(false));
    const[points, setPoints] = useState('0');
    const[bonusCounter, setBonusCounter] = useState('63');
    const numberField = [];
    const[bonusStatus, setBonusStatus] = useState('');

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
            <View style={styles.numberArea}>
                <Text style={styles.numberField}>{resultCounter[i]}</Text>
                <Pressable
                    key={"numbers" + i}
                    onPress={() => selectNumber(i)}>
                    <MaterialCommunityIcons
                        name={numberField[i]}
                        key={"numbers" + i}
                        size={50}
                        color={getNumberColor(i)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </View>
        )
    }

    const resetRound = (() => {
        setSelectedDices(Array(NBR_OF_DICES).fill(false));
        throwDices();
        setStatus("Throw dices");
        setNbrOfThrowsLeft(3);
    });

    const resetGame = (() => {
        setSelectedDices(Array(NBR_OF_DICES).fill(false));
        setStatus("Throw dices");
        setNbrOfThrowsLeft(3);
        setSelectedNumber(Array(NBR_OF_VALUES).fill(false));
        tempCounter = 0;
        setPoints(0);
        setBonusCounter(63);
        setBonusStatus('You are ' + bonusCounter + ' points away from bonus.');
        resultCounter = [0,0,0,0,0,0];
    });

    useEffect(() => {
        checkBonusPoint();
        if(points < 63){
            setBonusStatus('You are ' + bonusCounter + ' points away from bonus.');
        } else{
            setBonusStatus('You won the bonus of 35 Points!');
        }
        
        if(nbrOfThrowsLeft < 0){
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [nbrOfThrowsLeft]);
    
    function getDiceColor(i){
        return selectedDices[i] ? "black" : "steelblue";
    }

    function getNumberColor(i){
        return selectedNumber[i] ? "black" : "steelblue";
    }

    function selectDice(i){
        let dices = [...selectedDices];
        if(nbrOfThrowsLeft === 3 || nbrOfThrowsLeft === 0){
            dices[i] = selectedDices[i] = false;
        } else{
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
        
    }

    const selectNumber = (i) => {
        let number = [...selectedNumber];
        number[i] = selectedNumber[i] ? false : true;
        if(nbrOfThrowsLeft === 3){
            setStatus('You have to throw dices first.');
        } else if (!selectedNumber[i]){
            setSelectedNumber(number);
            let tempSum = 0;
            for (let x = 0; x <= diceNumbers.length; x++) {
                if (diceNumbers[x] === (i + 1)) {
                    tempSum += diceNumbers[x];
                }
            }
            resultCounter[i] = tempSum;
            tempCounter = tempCounter + tempSum;
            setPoints(tempCounter);
            if(tempCounter < 63){
                setBonusCounter(63 - tempCounter);
            } else{
                setBonusCounter(0);
            }
            resetRound();
        } else{
            setStatus('You already set points for ' + (i + 1) + '.');
        }
    }

    function throwDices(){
        if(nbrOfThrowsLeft === 0){
            setStatus('Select your points before next throw.');
        } else if (selectedNumber.every(val => val === true)){
            setSelectedDices(Array(NBR_OF_DICES).fill(false));
            resetGame();
        } else{
            for(let i = 0; i < NBR_OF_DICES; i++){
                if(!selectedDices[i]){
                    let randomNumber = Math.floor(Math.random()*6+1);
                    board[i] = 'dice-'+randomNumber;
                    diceNumbers[i] = randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        }
    }

    function checkBonusPoint(){
        if(nbrOfThrowsLeft === 0){
            setStatus('Select your points.');
        } else if(selectedNumber.every(val => val === true)){
            if(points >= 63){
                setBonusStatus('You won the bonus of 35 Points.');
                setPoints(points + 35);
            }
            setStatus('Game over. All points selected.');
        } else if(nbrOfThrowsLeft === 3){
            setStatus('Throw dices.');
        } else{
            setStatus('Select and throw dices again.');
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
            <Text style={styles.points}>Total: {points}</Text>
            <Text style={styles.gameinfo}>{bonusStatus}</Text>
            <View style={styles.flex}>{numbers}</View>
        </View>
    )
}
