import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "native-base";
import { FontAwesome } from '@expo/vector-icons'; 
import Calculator from "./src/screens/calculator";
import Todo from "./src/screens/todo";
import Detail from "./src/screens/detail";


const Stack = createStackNavigator();


const Tab = createBottomTabNavigator()

const MyTab = () => {
    const theme = useTheme();

    return(
        <Tab.Navigator
        initialRouteName="Calculator"
      screenOptions={({ route }) => ({
        headerShown: false,
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: theme.colors.primary["300"] },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Calculator") {
            iconName = "calculator"
          } else if (route.name == "Todo") {
            iconName = "list"
          }

          return <FontAwesome name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary["800"],
        tabBarInactiveTintColor: "gray"
      })}
      >
           
            <Tab.Screen name="Calculator" component={Calculator} />
            <Tab.Screen name="Todo" component={Todo} />

        </Tab.Navigator>
    )
}

export default function Container() {
    const theme = useTheme();

    return(
        <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerMode: "screen",
            headerTintColor: "white",
            headerStyle: { backgroundColor: theme.colors.primary["300"] },
          }}
        >
          <Stack.Screen
            name="Main"
            component={MyTab}
            options={{
              headerShown: false
            }}
          />

    <Stack.Screen
          name="Detail"
          component={Detail}
        />  
        </Stack.Navigator>
      </NavigationContainer>
    )
}