import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import PlacesList from '../components/places/PlasesList';

const AllPlaces = ({route}) => {
    const [loadedPlaces, setLoadedPLaces ]= useState([])
    const isFocused = useIsFocused();
     useEffect(()=>{
        if(isFocused && route.params){
            setLoadedPLaces((currPlaces) =>{
                return [...currPlaces, route.params.place]
            })
        }
     }, [isFocused, route])

    return <PlacesList places={loadedPlaces}/>
}

export default AllPlaces;
