import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../ThemeContext';

function FriendsScreen({navigation}) {
    const { themeColor, theme } = useTheme();
    return (
        <View style={{backgroundColor: themeColor[100], flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text onPress={() => navigation.navigate('Home')}>Dje si mala sto cinis</Text>
        </View>
    );
}

export default FriendsScreen;