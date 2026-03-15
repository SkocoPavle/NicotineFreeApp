import React, { createContext, useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;

        const loadStartTime = async() => {
            const saved = await AsyncStorage.getItem("startTime");
            const start = saved ? Number(saved) : Date.now();

            if (!saved){
                await AsyncStorage.setItem("startTime", start.toString());
            }

            interval = setInterval(() => {
                setTime(Date.now() - start);
            }, 1000);
        };

        loadStartTime();

        return () => clearInterval(interval);
    }, []);

    const resetTimer = async() => {
        const now = Date.now();
        await AsyncStorage.setItem('startTime', now.toString());
    };

    return (
        <TimerContext.Provider value={{ time, resetTimer }}>
            {children}
        </TimerContext.Provider>
    );
};