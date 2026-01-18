import React from 'react';
import { SafeAreaView} from 'react-native-safe-area-context';
import { StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import PagerView from 'react-native-pager-view'

import Home from './screens/HomeScreen';
import StatisticScreen from './screens/StatisticScreen';
import FriendsScreen from './screens/FriendsScreen';
import BadgeScreen from './screens/BadgeScreen';
import ProfieScreen from './screens/ProfieScreen';

function SwipePages() {
    return (
        <SafeAreaView style={styles.container}>
            <PagerView style={styles.container} initialPage={0}>
                <View style={styles.page} key={1}>
                    <Home />
                </View>
                <View style={styles.page} key={2}>
                    <StatisticScreen />
                </View>
                <View style={styles.page} key={3}>
                    <FriendsScreen />
                </View>
                <View style={styles.page} key={4}>
                    <BadgeScreen />
                </View>
                <View style={styles.page} key={5}>
                    <ProfieScreen />
                </View>
            </PagerView>
        </SafeAreaView>
    );
}

export default SwipePages;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
    
})