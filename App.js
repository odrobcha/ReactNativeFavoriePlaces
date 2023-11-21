import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/iconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';

const Stack = createNativeStackNavigator();

export default function App () {
    return (
      <>
          <StatusBar style='dark'/>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: Colors.primary800,
                  contentStyle: {
                      backgroundColor: Colors.gray700
                  }

              }}>
                  <Stack.Screen name="AllPlaces"
                                component={AllPlaces}
                                options={({ navigation }) => ({
                                    title: 'Your favorite places',
                                    headerRight: ({ tintColor }) => (
                                      <IconButton
                                        icon="add"
                                        size={24}
                                        color={tintColor}
                                        onPress={() => {
                                            navigation.navigate('AddPlace');
                                        }}
                                      />
                                    ),
                                })}
                  />
                  <Stack.Screen name="AddPlace" component={AddPlace} title="Add new place"/>
                  <Stack.Screen name="Map" component={Map} title="Map"/>
              </Stack.Navigator>
          </NavigationContainer>
      </>
    );
}


