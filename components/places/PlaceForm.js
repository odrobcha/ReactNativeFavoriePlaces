import {useState, useCallback} from 'react'

import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { Place } from '../../models/place';


const PlaceForm = ({onCreatePlace}) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const changeTitleHandler = (enteredText)=>{
        setEnteredTitle(enteredText);
    };
    const takeImageHandler = (imageUri) =>{
        setSelectedImage(imageUri)
    };
    const pickLocationHandler = useCallback((location) =>{
        setPickedLocation(location)
    } , []);
    const savePlaceHandler = () =>{
        const placeData = new Place(enteredTitle,selectedImage, pickedLocation  )
        onCreatePlace(placeData);

    };
    return (
      <ScrollView style={style.form}>
          <View >
              <Text style={style.label}>Title</Text>
              <TextInput
                style={style.input}
                onChangeText={changeTitleHandler}
                value={enteredTitle}
              />
          </View>
          <ImagePicker onTakeImage = {takeImageHandler}/>
          <LocationPicker onPickLocation = {pickLocationHandler}/>
          <Button onPress={savePlaceHandler}>
              Add Place
          </Button>

      </ScrollView>
    );
};

export default PlaceForm;

const style = StyleSheet.create({
    form : {
        flex: 1,
        padding: 24,
        marginBottom: 40,

    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginHorizontal: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor:Colors.primary100
    }
})
