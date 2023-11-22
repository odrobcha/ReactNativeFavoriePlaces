import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/iconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import {init} from './util/database'
import LoadingOverlay from './components/ui/LoadingOverlay';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App () {
    const [dbInitialized, setDbInitialized] = useState(true);

    useEffect(() => {
        // init()
        //   .then(() => {
        //
        //       console.log("DB ok")
        //   })
        //   .catch((err) => {
        //       console.log(err);
        //   })
        //   .finally(()=>{
        //       setDbInitialized(true);
        //   });
    }, []);

    if(!dbInitialized){
        return <LoadingOverlay message="Loading..."/>
    }

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
                  <Stack.Screen name="PlaceDetails"
                                component={PlaceDetails}
                                title="Map"
                                options ={{
                                    title: "Loading"
                                }}
                  />
              </Stack.Navigator>
          </NavigationContainer>
      </>
    );
}


/*


   <MapView
          style={styles.map}
          initialRegion={region}
        >

              <Marker
                title="Picked Location"
                coordinate={{
                    latitude: pickedLocation.lat,
                    longitude:pickedLocation.lng,
                }}
              />

        </MapView>


 */
