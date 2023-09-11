import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screen/List';
import details from './app/screen/details';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="                           TODO " component={List} />
          <Stack.Screen name="details" component={details} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


