import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import MainContainer from './app/MainContainer';
function App() {
  return (
    <View style={{flex: 1}}>
      <MainContainer />
    </View>
  );
}

export default App;