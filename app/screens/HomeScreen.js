import {StyleSheet, View, Pressable, Image, Text} from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context';
import { useState } from 'react';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';



export default function Home() {
  const [count, setCount] = useState(0);
  const [totalNicotine, setTotalNicotine] = useState(0);
  const [limit] = useState(20);
  const [animatedProgress] = useState(new Animated.Value(0));

  const isOverLimit = count >= limit;
  const progressValue = Math.min(count / limit, 1);

  const cigaretteCount = () => {
  const newCount = count + 1;
  setCount(newCount);
  setTotalNicotine(totalNicotine => totalNicotine + 2);

  // animiraj progres od 0 do 1 (limit)
  Animated.timing(animatedProgress, {
    toValue: Math.min(newCount / limit, 1),
    duration: 300, // trajanje animacije u ms
    useNativeDriver: false, // boja ne može sa native driver
    }).start();
  } ;

  const circleColor = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4A90E2', '#E53935'], // plava → crvena
    });

  return (
    <View style={styles.container}>
        <View style={styles.counter}>
          <Text style={styles.text}>Cigarette Counter</Text><View style={styles.counterView}>
              <Progress.Circle
                progress={progressValue}
                size={210}
                thickness={12}
                color={circleColor}
                unfilledColor="lightgray"
                borderWidth={0}
                style={styles.circle}
                strokeCap="round"/>
              <Animated.Text style={{ fontSize: 100, color: circleColor }}>{count}<Text style={{fontSize: 20, color: 'lightgray'}}>/{limit}</Text></Animated.Text>
          </View>


          <View style={styles.nicotineView}>
            <Text style= {{fontSize: 16, paddingBottom: 10, color: 'gray'}}>You have consumed approximately nicotine</Text>

            <View style={styles.nicotineStats}>
              <Text style={styles.textNicotine}>
                <Ionicons name="water-outline" size={22} color="black" /> {totalNicotine} mg
              </Text>
            </View>

          </View>
        </View>

        <SafeAreaView style={styles.buttonContainer}>
            <Pressable style={[styles.button,  {backgroundColor: isOverLimit ? "#E53935" : "#4A90E2"}]} onPress={cigaretteCount}>
              <Animated.View style={[styles.button, { backgroundColor: circleColor }]}>
                <Progress.Circle
                  progress={100}
                  size={200}
                  thickness={5}
                  color= {'white'}
                  unfilledColor="lightgray"
                  borderWidth={0}
                  style={styles.circle}/>
                <Text style={{ fontSize: 40, color: 'white' }}>Smoke</Text>
              </Animated.View>
            </Pressable>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },

  button: {
    width: 200,
    height: 200,
    borderRadius: 150,
    alignItems: 'center', 
    justifyContent: 'center' 
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
    height: '50%',
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

  circle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
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
    fontSize: 22,
  },

  counterText: {
    fontWeight: 'bold',
    fontSize: 25,
    
  },
});
