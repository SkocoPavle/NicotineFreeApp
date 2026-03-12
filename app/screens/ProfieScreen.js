import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../ThemeContext';
function ProfieScreen() {
    const { themeColor, theme } = useTheme();
    return (
        <View style={{backgroundColor: themeColor[100], flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{top: +150, left: 120}} onPress={() => navigation.navigate('Home')}>Opa</Text>
        </View>
    )}
export default ProfieScreen;