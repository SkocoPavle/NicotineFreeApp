import { View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useMemo } from 'react';
import { Color } from './constants/TWPalete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateMonthlyData } from './constants/DummtData';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface BarData {
  value: number;
  label?: string;
  frontColor?: string;
  [key: string]: any;
}

const scrollY = new Animated.Value(0);

const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
});

const colorThemes = {
  blue: { name: "blue", primary: 500, accent: 600 },
  purple: { name: "purple", primary: 500, accent: 600 },
  emerald: { name: "emerald", primary: 500, accent: 600 },
  orange: { name: "orange", primary: 500, accent: 600 },
  pink: { name: "pink", primary: 500, accent: 600 },
  cyan: { name: "cyan", primary: 500, accent: 600 },
};

function StatisticScreen({navigation}) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [colorTheme, setColorTheme] = useState("blue");
    const theme = colorThemes[colorTheme];

    const themeColor = Color[theme.name];

    const bgColors = [
        Color[theme.name][100],
        "#ffffff",
        Color[theme.name][100],
    ];

    const getMonthName = (month) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return months[month];
    };

    const navigateMonth = (direction) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;
        if (newMonth < 0){
            newYear = currentYear - 1
            newMonth = 11;
        }
        else if(newMonth > 11){
            newYear++;
            newMonth = 0;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        setSelectedBarIndex(null);
    }

    const montlyData = useMemo( () => generateMonthlyData(currentYear, currentMonth), [currentYear, currentMonth]);
    const [selectedBarIndex, setSelectedBarIndex] = useState(null);


    const getChartData = () => {
        return montlyData.map((item, index) => ({
            ...item,
            topLabelComponent : () =>
                selectedBarIndex  === index ? (
                    <Text style={{color: themeColor[700], fontSize: 10, fontWeight: "600", marginBottom: 4}}>
                        {item.value}
                    </Text>
                ): null
        }));
    }

    return (
        <LinearGradient colors={bgColors} style={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <Animated.View
                    style={{
                        top: "%",
                        left: "3%",
                        right: 0,
                        height: 60,
                        opacity: headerOpacity,
                        zIndex: 10,
                    }}
                    >
                    <Text style={{ fontSize: 35, fontWeight: '700' }}>
                        Dashboard
                    </Text>
                </Animated.View>
                
                {/*View for the Month and icons*/}
                <View style ={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 5,
                    paddingHorizontal: 14,
                }}>

                    <Pressable onPress={() => navigateMonth(-1)} style={{padding: 8, borderRadius: 8}} hitSlop={20}>
                        <Ionicons name="chevron-back" size={24} color={Color.gray[500]}/>
                    </Pressable>

                    <Text
                        style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: Color.gray[900],
                        }}>
                            {getMonthName(currentMonth)} {currentYear}
                    </Text>

                    <Pressable onPress={() => navigateMonth(1)} style={{padding: 8, borderRadius: 8}} hitSlop={20}>
                        <Ionicons name="chevron-forward" size={24} color={Color.gray[500]}/>
                    </Pressable>                    
                </View>

                <Animated.ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{ paddingTop: 20 }} // da sadržaj ne ide ispod headera
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}>

                    <BarChart data={getChartData()} showGradient gradientColor={Color[theme.name][500]} frontColor={Color[theme.name][300]}
                        noOfSections={4} yAxisThickness={0} xAxisThickness={0} dashGap={10}
                        onPress={(_item: BarData, index: number) => {
                        setSelectedBarIndex(selectedBarIndex === index ? null : index);
            }}/>

                    {/* Color theme selector*/}
                    <View style={{paddingHorizontal: 16, paddingTop: 20}}>
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
                </Animated.ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)"
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