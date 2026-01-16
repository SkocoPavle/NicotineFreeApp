import React from 'react';
import { Text, View } from 'react-native';

function FriendsScreen({navigation}) {
    return (
        <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Text onPress={() => navigation.navigate('Home')}>Dje si mala sto cinis</Text>
        </View>
    );
}

export default FriendsScreen;