import React from 'react';
import { ScrollView } from 'react-native';
import PlaceForm from '../components/places/PlaceForm';

const AddPlace = ({ navigation }) => {
    const createPlaceHandler = (place) => {
        navigation.navigate('AllPlaces', { place: place });
    };

    return (
      <ScrollView>
          <PlaceForm onCreatePlace={createPlaceHandler}/>
      </ScrollView>

    );

};

export default AddPlace;
