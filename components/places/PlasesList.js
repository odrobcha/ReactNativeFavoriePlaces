import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import {useNavigation } from '@react-navigation/native'

const PlacesList = ({ places }) => {

    const navigation = useNavigation();
    const selectPlaceHandler = (id) =>{
        navigation.navigate("PlaceDetails", {
            placeId : id
        })
    }


    if(!places || places.length === 0){
        return(
          <View style = {style.fallbackContainer}>
              <Text style = {style.fallbackText}>No places. Start add places</Text>
          </View>
        )
    }

    return (
      <FlatList
        style={style.listStyle}
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
      />
    );
};
export default PlacesList;

const style = StyleSheet.create({
    fallbackContainer : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    },
    listStyle: {
        margin :24
    }
})
