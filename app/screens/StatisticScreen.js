import React from 'react';
import { View, Text } from 'react-native';
function StatisticScreen({navigation}) {
    return (
        <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Text onPress={() => navigation.navigate('Home')}>Ciao bello</Text>
        </View>
    );
}

export default StatisticScreen;