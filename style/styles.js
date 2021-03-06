import { Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
      },

      scrollView: {
        marginHorizontal:20,
      },

      header: {
        flex: 1,
        color: '#1e90ff',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 10,
        marginBottom: 30,
        width: '100%',
        textAlign: 'center',
      },

      footer: {
        marginTop: 30,
        backgroundColor: '#1e90ff',
        flexDirection: 'row',
      },

      author: {
        color: 'white',
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
      },

      gameboard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },
      
      gameinfo: {
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18,
      },

      points: {
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
      },

      item: {
        margin: 15,
        padding: 5
      },

      flex: {
        flexDirection: "row",
        marginBottom: 20,
      },

      button: {
        margin: 30,
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#73CED6",
        width: 150,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },

      buttonText: {
        color:"#2B2B52",
        fontSize: 20
      },

      numberField: {
        textAlign: "center",
        margin: "auto",
        fontSize: 20
      },

      numberArea: {
        marginTop: 30
      }
});