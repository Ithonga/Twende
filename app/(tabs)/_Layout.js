import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const _layout = () => {
    return (
        <Tabs screenOptions={{  tabBarActiveTintColor: "#00B0FF" }}>
            <Tabs.Screen name='home' options={{
                headerShown: false,
                title: "Home",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name={focused ?"home" : "home-outline"}
                        size={30}
                        color={color} />
                ),
            }} />
            <Tabs.Screen name='explore' options={{
                headerShown: false,
                title: "Explore",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name={focused ?   "search-sharp" : "search-outline"}
                        size={30}
                        color={color} />
                ),
            }} />
            <Tabs.Screen name='trips' options={{
                headerShown: false,
                title: "Trips",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name={focused ? "airplane" : "airplane-outline"}
                        size={30}
                        color={color} />
                ),
            }} />
            <Tabs.Screen
                name='profile'
                screenOptions={{ 
                    headerShown: false 
                    }}
                options={{
                    
                    title: "Profile",
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome
                            name={focused ? "user" : "user-o"}
                            size={30}
                            color={color} />
                    ),
                }} />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})