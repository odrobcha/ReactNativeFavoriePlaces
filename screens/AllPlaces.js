import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import PlacesList from '../components/places/PlasesList';
import {fetchPlaces} from '../util/http';

const AllPlaces = ({route}) => {
    const [loadedPlaces, setLoadedPLaces ]= useState([])
    const isFocused = useIsFocused();
     useEffect(()=>{
         const fetchPlacesData = async ()=>{
             const places = await fetchPlaces();
             // console.log("I AM HERE " , places)
             setLoadedPLaces(places);
         };


        if(isFocused){
            fetchPlacesData();
           /* setLoadedPLaces((currPlaces) =>{
                return [...currPlaces, route.params.place]
            })*/
        }
     }, [isFocused]);

     /*useEffect(()=>{
         const fetchPlacesData = async ()=>{
            const places = await fetchPlaces();
            // console.log("I AM HERE " , places)
             setLoadedPLaces(places);
         };
         fetchPlacesData();
     }, [])*/

    return <PlacesList places={loadedPlaces}/>
}

export default AllPlaces;
