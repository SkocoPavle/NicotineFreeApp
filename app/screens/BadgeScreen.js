import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../ThemeContext';

function BadgeScreen() {
    const { themeColor, theme } = useTheme();
    
    return (
        <View style={{backgroundColor: themeColor[100], flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            
        </View>
    );
}

export default BadgeScreen;