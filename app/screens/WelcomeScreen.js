import {StyleSheet, View, SafeAreaView, Pressable, Image} from 'react-native';

export default function Home() {
  return (
    <>
      <SafeAreaView style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Image source={require('../assets/cig.jpg')} style={styles.image}/>
        </Pressable>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 90,
    alignItems: 'center',
  },

  button: {
    width: 200,
    height: 200,
    borderRadius: 150,
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
