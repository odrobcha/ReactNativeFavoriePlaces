import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import PlaceItem from './PlaceItem';

const PlacesList = ({ places }) => {

    if(!places || places.length === 0){
        return(
          <View style = {style.fallbackContainer}>
              <Text style = {style.fallbackText}>No places. Start add places</Text>
          </View>
        )
    }

    return (
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <PlaceItem place={item}/>}
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
        fontSize: 16
    }
})
