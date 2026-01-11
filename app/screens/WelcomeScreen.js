import {StyleSheet, View, SafeAreaView, Pressable, Image} from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
        <View style={styles.counter}>
        </View>
        <SafeAreaView style={styles.buttonContainer}>
            <Pressable style={styles.button}>
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
    paddingBottom: 120,
    alignItems: 'center',
  },

  button: {
    width: 200,
    height: 200,
    borderRadius: 150,
  },

  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },

  counter: {
    backgroundColor: '#fff',
    width: 370,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 450,
    top: 80,
    left: 20,
    borderRadius: 10
  },

  image: {
    resizeMode: 'contain',
    backgroundColor: 'black',
    height: 200,
    width: 200,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
