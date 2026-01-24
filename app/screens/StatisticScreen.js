import { View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Color } from './constants/TWPalete';
import { SafeAreaView } from 'react-native-safe-area-context';


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
    const theme = colorThemes[colorTheme];

    const themeColor = Color[theme.name];

    const bgColors = [
        Color[theme.name][100],
        "#ffffff",
        Color[theme.name][100],
    ];

    const data = [{ value: 50}, {value: 80}, {value: 90}, {value: 70}];

    return (
        <LinearGradient colors={bgColors} style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={{paddingTop: 20}}>
                    <BarChart data={data} showGradient gradientColor={Color[theme.name][500]} frontColor={Color[theme.name][300]}/>

                    {/* Color theme selector*/}
                    <View style={{paddingHorizontal: 16}}>
                        <Text style={styles.subtitle}>Choose Theme</Text>

                        <View style={{flexDirection: "row", gap: 16}}>
                            {Object.keys(colorThemes).map((theme) => (
                                <Pressable key={theme} onPress={() => setColorTheme(theme)}
                                style={{
                                    backgroundColor:
                                        //@ts-ignore
                                        Color[colorThemes[theme].name][500],
                                        padding: 16,
                                        borderRadius: 15,
                                        width: 30,
                                        height: 30,
                                        borderWidth: colorTheme === theme ? 3 : 0,
                                        borderColor: "white",
                                        boxShadow:
                                            colorTheme === theme
                                            ? "0px 2px 8px rgba(0, 0, 0, 0.2)"
                                            : "none",
                                }}/>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Color.gray[900],
  },
  subtitle: {
    fontSize: 16,
    color: Color.gray[600],
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Color.gray[600],
  },
});
export default StatisticScreen;