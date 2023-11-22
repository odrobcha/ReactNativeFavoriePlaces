import { ScrollView, Image, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import OutlinedButton from '../components/ui/OutlinedButton';
import { Colors } from '../constants/colors';
import { useEffect, useState } from 'react';
import { fetchPlaceDetails } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const PlaceDetails = ({ route, navigation }) => {
    const selectedPlaceId = route.params.placeId;
    const [placeData, setPlaceData] = useState(null);

    useEffect(() => {
        //Fetch the data
        const fetchPlaceData = async () => {
            const response = await fetchPlaceDetails(selectedPlaceId);
            setPlaceData(response);
            navigation.setOptions({
                title: response.title
            })
        };

        fetchPlaceData();
    }, [selectedPlaceId]);

    const showOnMapHandler = () => {
            navigation.navigate('Map', {
                initialLat : placeData.location.lat,
                initialLng : placeData.location.lng,
            })
    };
    if (!placeData){
        return <LoadingOverlay message="Loading..."/>
    }

    return (
      <SafeAreaView>


          <ScrollView>
              <Image
                source={{ uri:placeData.imageUri }}
                style={style.image}/>
              <View style={style.locationContainer}>
                  <View style={style.addressContainer}>
                      <Text style={style.address}>{placeData.address}</Text>
                  </View>
                  <OutlinedButton icon="map" onPress={showOnMapHandler}>View on map</OutlinedButton>
              </View>
          </ScrollView>
      </SafeAreaView>
    );
};

export default PlaceDetails;

const style = StyleSheet.create({

    image: {
        padding: 50,
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }

});
