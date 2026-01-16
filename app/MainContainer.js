import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/HomeScreen'
import StatisticScreen from './screens/StatisticScreen';
import FriendsScreen from './screens/FriendsScreen';
import BadgeScreen from './screens/BadgeScreen';
import ProfieScreen from './screens/ProfieScreen';

const homeName = 'Home';
const statisticName = 'Statistics';
const friendsName = 'Friends';
const badgeName = 'Badges';
const profileName = 'Profile'


const Tab = createBottomTabNavigator();


function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName = {homeName}
                screenOptions = {({route}) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } 
                        else if (rn === statisticName){
                            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                        }
                        else if (rn === friendsName){
                            iconName = focused ? 'people' : 'people-outline'; 
                        }

                        else if (rn === badgeName){
                            iconName = focused ? 'ribbon' : 'ribbon-outline';
                        }

                        else if (rn === profileName){
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },

                    tabBarLabelStyle: { fontSize: 14},   // 👈 labelStyle
                    tabBarStyle: { height: 110, paddingTop: 10},
                })}
                >
                    <Tab.Screen name = {badgeName} component={BadgeScreen}/>
                    <Tab.Screen name = {statisticName} component={StatisticScreen}/>
                    <Tab.Screen name = {homeName} component={WelcomeScreen}/>
                    <Tab.Screen name = {friendsName} component={FriendsScreen}/>
                    <Tab.Screen name= {profileName} component={ProfieScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;