import axios from 'axios';
import { Place } from '../models/place';
const BASE_URL = 'https://axios-50088-default-rtdb.europe-west1.firebasedatabase.app/';
export const savePlace = async (place)=>{

    const response = await axios.post(
      BASE_URL + '/places.json',
      place
    );

    const id = response.data.name;

    let location = {
        address: place.address,
        lat : place.location.lat,
        lng : place.location.lng,
    };



    let addedPlace = new Place(place.title, place.imageUri, location, response.data.name);
    return addedPlace;
};

export const fetchPlaces = async ()=>{
    const response = await axios.get(
      BASE_URL + '/places.json');
    let places = [];
    for (let name in response.data){
        let location = {
            address: response.data[name].address,
            lat : response.data[name].location.lat,
            lng : response.data[name].location.lng,
        };
        let tempPlace = new Place(response.data[name].title,response.data[name].imageUri, location, name );

        places.push(tempPlace)
    }
    return places
};

export const fetchPlaceDetails = async(id)=>{

    let url = BASE_URL + `/places.json`;

    const response = await axios.get(url);

    return response.data[id];

}
