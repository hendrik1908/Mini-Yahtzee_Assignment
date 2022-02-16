import React from 'react';
import {Text, View} from 'react-native';
import styles from '../style/styles';

export default function Header(){
    return(
        <View>
            <Text style={styles.header}>
                Mini-Yahtzee
            </Text>
        </View>
    )
}