import React from 'react';
import { Text, View } from 'react-native';

function ProfieScreen() {
    return (
        <View style={{flex: '1',justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{top: +150, left: 120}} onPress={() => navigation.navigate('Home')}>Opa</Text>
        </View>
    )}
export default ProfieScreen;