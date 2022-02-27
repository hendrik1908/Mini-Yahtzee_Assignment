import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import styles from './style/styles';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.container}>
        <Header />
        <ScrollView style={styles.scrollView}>
          <Gameboard />
        </ScrollView>
        <Footer  />
        <StatusBar style="auto" />
    </View>
  );
}

