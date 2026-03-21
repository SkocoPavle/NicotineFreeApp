import {React, useContext} from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../ThemeContext';
import { TimerContext } from './Timecontext';

function BadgeScreen() {
    const { themeColor, theme } = useTheme();
    const {time} = useContext(TimerContext);
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60));
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(time / (1000 * 60 * 60 * 24 * 365));
    
    return (
        <View style={{backgroundColor: themeColor[100], flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                {hours}:{minutes}:{seconds}
            </Text>
        </View>
    );
}

export default BadgeScreen;