import React from 'react';
import { ScrollView } from 'react-native';
import PlaceForm from '../components/places/PlaceForm';
import { insertPlace } from '../util/database';
import {savePlace} from '../util/http';

const AddPlace = ({ navigation }) => {
    const createPlaceHandler = async (place) => {
        // await insertPlace(place);
        const res = await savePlace(place);
        navigation.navigate('AllPlaces',);
    };

    return (
      <ScrollView>
          <PlaceForm onCreatePlace={createPlaceHandler}/>
      </ScrollView>

    );

};

export default AddPlace;
