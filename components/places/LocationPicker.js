import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image, Text } from 'react-native';
import OutlinedButton from '../ui/OutlinedButton';
import { Colors } from '../../constants/colors';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location';
import { getAddress } from '../../util/location';

const LocationPicker = ({onPickLocation}) => {
    const isFocused = useIsFocused();  //true if screen is focused, and false - if screen is not Focused
    const route = useRoute();

    useEffect(() => {
        if (isFocused && route.params) {
            //const mapPickedLocation = route.params ? {lat: route.params.pickedLat, lng : route.params.pickedLng}: null;
            const mapPickedLocation = {         // the same as above
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);




    const navigation = useNavigation();
    const [pickedLocation, setPickedLocation] = useState();

    useEffect(()=>{
        const handleLocation = async () =>{
            if(pickedLocation){
               const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                onPickLocation({...pickedLocation, address: address});
            }
        }
        handleLocation();

    }, [pickedLocation, onPickLocation]);

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
    const verifyPermission = async () => {

        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionRes = await requestPermission();
            return permissionRes.granted;
        }
        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Yuo need to grant camera permission');
            return false;
        }

        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });


    };
    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    };
    let locationPrev = <Text>No location picked yet</Text>;
    if (pickedLocation) {

        locationPrev = <View>
            {/* <Image
              style={styles.image}
              source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}/>*/}
            <Text>Lat: {pickedLocation.lat}</Text>
            <Text>Lng: {pickedLocation.lng}</Text>
        </View>;

    }

    return (
      <View>
          <View style={styles.mapPreview}>
              {locationPrev}
          </View>
          <View style={styles.actions}>
              <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
              <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on map</OutlinedButton>

          </View>

      </View>
    );
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});
