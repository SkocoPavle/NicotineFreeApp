import {StyleSheet, View, SafeAreaView, Pressable, Image, Text} from 'react-native';
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const [totalNicotine, setTotalNicotine] = useState(0);
  const [limit] = useState(20);


  const cigaretteCount = () => {
      setCount(count => count + 1);
      setTotalNicotine(totalNicotine => totalNicotine + 2);
  }
  return (
    <View style={styles.container}>

        <View style={styles.counter}>
          <Text style={styles.text}>Cigarette Counter</Text>

          <View style={styles.counterView}>
            <Text style={{fontSize: 100, fontWeight: 'bold', color: 'dodgerblue'}}>{count}<Text style={{fontSize: 20, color: 'lightgray'}}>/{limit}</Text></Text>
          </View>


          <View style={styles.nicotineView}>
            <Text style= {{fontSize: 16, paddingBottom: 10, color: 'gray'}}>You have consumed approximately nicotine</Text>

            <View style={styles.nicotineStats}>
              <Text style={styles.textNicotine}>{totalNicotine} mg</Text>
            </View>

          </View>
        </View>

        <SafeAreaView style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={cigaretteCount}>
            <Image source={require('../assets/cig.jpg')} style={styles.image}/>
            </Pressable>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 130,
    alignItems: 'center',
  },

  button: {
    width: 170,
    height: 170,
    borderRadius: 150,
  },

  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },

  counter: {
    backgroundColor: '#fff',
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 10,
    height: '45%',
    top: 110,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
    },

  counterView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  image: {
    resizeMode: 'contain',
    backgroundColor: 'black',
    height: 170,
    width: 170,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nicotineView: {
    marginTop: 'auto',
    alignItems: "center",
    paddingBottom: '5%',
  },

  nicotineStats :{
    backgroundColor: 'lightgray',
    width: 120,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text : {
    fontWeight: 'bold',
    fontSize: 30,
  },

  textNicotine : {
    fontWeight: 'bold',
    fontSize: 20,
  },

  counterText: {
    fontWeight: 'bold',
    fontSize: 25,
    
  },
});
