import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const colorThemes = {
  blue: { name: "blue", primary: 500, accent: 600 },
  purple: { name: "purple", primary: 500, accent: 600 },
  emerald: { name: "emerald", primary: 500, accent: 600 },
  orange: { name: "orange", primary: 500, accent: 600 },
  pink: { name: "pink", primary: 500, accent: 600 },
  cyan: { name: "cyan", primary: 500, accent: 600 },
};

function StatisticScreen({navigation}) {
    const [colorTheme, setColorTheme] = useState("blue");
    return (
        <LinearGradient colors={["#000000", "#ffffff"]}>
            <BarChart />
        </LinearGradient>
    );
}

export default StatisticScreen;