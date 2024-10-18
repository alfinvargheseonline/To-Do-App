import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AddItem" 
            component={AddItemScreen} 
            options={{ title: 'ADD TODO' }}
          />
          <Stack.Screen 
            name="ItemDetails" 
            component={ItemDetailsScreen} 
            options={{ title: 'TODO DETAILS' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </SafeAreaView>
  );
}