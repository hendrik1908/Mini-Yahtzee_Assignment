import React, { Component, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text  } from 'react-native';
import styles from '../style/radioButtonStyle';

export default class SelfmadeRadioButton extends Component {
	state = {value: null,};
	
	
	render() {
		const { propertie } = this.props;
		const { valueGender } = this.state;

		return (
			<View>
				{propertie.map(result => {
					return (
						<View value={result.value} style={styles.wrapper}>
							<Text style={styles.label}>{result.label}</Text>
							<TouchableOpacity
								style={styles.style}
								onPress={() => {
									this.setState({
										valueGender: result.value,
									});
								}}>
                                  {valueGender === result.value && <View style={styles.selected}/>}
								  {this.props.onChange(valueGender)}
							</TouchableOpacity>
						</View>
					);
				})}	
			</View>
		);
	}
}
