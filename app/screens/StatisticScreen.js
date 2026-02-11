import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useMemo, useEffect } from 'react';
import { Color } from './constants/TWPalete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateMonthlyData, weeklyData } from './constants/DummtData';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PreventRemoveContext } from '@react-navigation/native';

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

function StatisticScreen({ navigation }) {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [weeklyData, setWeeklyData] = useState([]);
    const [currentDay, setCurrentDay] = useState(new Date().getDay());
    const [colorTheme, setColorTheme] = useState("cyan");
    const limit = useState(40);
    const theme = colorThemes[colorTheme];

    const themeColor = Color[theme.name];

    const bgColors = [
        Color[theme.name][100],
        "#ffffff",
        Color[theme.name][100],
    ];

    // Ime mjeseca
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

    // Funkcija za dobijanje imena dana
    const getDayName = (day) => {
        const days = [
            "Sun",
            "Mon",
            "Tue",
            "wed",
            "Thu",
            "Fri",
            "Sat"
        ];
        return days[day];
    }

    // Funkcija za dobijanje prvog dana u sedmici
    const getStartOfWeek = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDay();
        newDate.setDate(newDate.getDate() - day);
        return newDate;
    };

    //Funkcija koja sluzi za cuvanje prvog puta kada korisnik instalira aplikaciju
    const ensureInstallDate = async () => {
        const storedDate = await AsyncStorage.getItem('installDate');

        if (!storedDate) {
            const today = new Date().toISOString();
            await AsyncStorage.setItem('installDate', today)
            return new Date(today);
        }

        return new Date(storedDate);
    }

    //referenca za brojanje sedmica
    const getWeekNumber = (date, installDate) => {
        if (!installDate) return 0;
        const startOfInstallWeek = getStartOfWeek(installDate);
        const startOfCurrentWeek = getStartOfWeek(date);

        const diffInDays = (startOfCurrentWeek - startOfInstallWeek) / (1000 * 60 * 60 * 24);
        return Math.max(0, Math.floor(diffInDays / 7) + 1);
    }

    //Za pravljenje podataka u sedmici i prikaz preko statistike
    const generateWeeklyData = async (weekStart) => {
        const storedStats = await AsyncStorage.getItem('dailyStats');
        const stats = storedStats ? JSON.parse(storedStats) : {};
        const weekData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const key = date.toISOString().split('T')[0];
            weekData.push({
                value: stats[key] || 0, label: getDayName(date.getDay()),
            });
        }
        return weekData;
    }

    //Navigacija kroz sedmice

    const navigateWeek = async (direction) => {
        if (!installDate) return null;

        const newWeekStart = new Date(currentWeekStart);
        newWeekStart.setDate(newWeekStart.getDate() + direction * 7);

        if (newWeekStart > maxWeek || newWeekStart < installWeek) {
            return;
        }

        const data = await generateWeeklyData(newWeekStart);
        setCurrentWeekStart(newWeekStart);
        setWeeklyData(data);
    }

    //Navigacija kroz mjesece
    const navigateMonth = (direction) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;
        if (newMonth < 0) {
            newYear = currentYear - 1
            newMonth = 11;
        }
        else if (newMonth > 11) {
            newYear++;
            newMonth = 0;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        setSelectedBarIndex(null);
    }

    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));


    const montlyData = useMemo(() => generateMonthlyData(currentYear, currentMonth), [currentYear, currentMonth]);
    const [selectedBarIndex, setSelectedBarIndex] = useState(null);

    const [installDate, setInstallDate] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(null);

    useEffect(() => {
        if (!currentWeekStart) return;

        const fetchData = async () => {
            const data = await generateWeeklyData(currentWeekStart);
            setWeeklyData(data);
        }

        fetchData();
    }, [currentWeekStart]);


    const [viewMode, setViewMode] = useState("weekly") // set mode za sedmice ili mjesece

    const getChartData = () => {
        if (viewMode === "weekly") {
            if (!weeklyData) return [];
            return weeklyData.map((item, index) => ({
                ...item,
                topLabelComponent: () =>
                    selectedBarIndex === index ? (
                        <Text style={{ color: themeColor[700], fontSize: 14, fontWeight: "600", marginBottom: 4 }}>
                            {item.value}
                        </Text>
                    ) : null
            }));
        } else {
            return montlyData.map((item, index) => ({
                ...item,
                topLabelComponent: () =>
                    selectedBarIndex === index ? (
                        <Text style={{ color: themeColor[700], fontSize: 14, fontWeight: "600", marginBottom: 4 }}>
                            {item.value}
                        </Text>
                    ) : null
            }));
        }
    }

    return (
        <LinearGradient colors={bgColors} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.View
                    style={{
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

                {/*Style for the buttons of the weekly stats and monyly stats*/}
                <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingVertical: 10, paddingLeft: 10, gap: 20 }}>
                    <Pressable onPress={() => setViewMode("weekly")}><Text style={{ fontSize: 20 }}>Weekly</Text></Pressable>
                    <Pressable onPress={() => setViewMode("montly")}><Text style={{ fontSize: 20 }}>Montly</Text></Pressable>
                </View>
                {/*View for the Month and icons*/}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 5,
                    paddingHorizontal: 14,
                }}>

                    <Pressable onPress={() => viewMode === "weekly" ? navigateWeek(-1) : navigateMonth(-1)} style={{ padding: 8, borderRadius: 8 }} hitSlop={20}>
                        <Ionicons name="chevron-back" size={24} color={Color.gray[500]} />
                    </Pressable>

                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: Color.gray[900],
                        }}>
                        {viewMode === "weekly"
                            ? `Week ${getWeekNumber(currentWeekStart, installDate)}`
                            : `${getMonthName(currentMonth)} ${currentYear}`}
                    </Text>

                    <Pressable onPress={() => viewMode === "weekly" ? navigateWeek(+1) : navigateMonth(+1)} style={{ padding: 8, borderRadius: 8 }} hitSlop={20}>
                        <Ionicons name="chevron-forward" size={24} color={Color.gray[500]} />
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
                        onPress={(_item, index) => {
                            setSelectedBarIndex(selectedBarIndex === index ? null : index);
                        }} />

                    {/* Color theme selector*/}
                    <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
                        <Text style={styles.subtitle}>Choose Theme</Text>

                        <View style={{ flexDirection: "row", gap: 16 }}>
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
                                    }} />
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
        fontSize: 18,
        color: Color.gray[600],
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: Color.gray[600],
    },
});
export default StatisticScreen;