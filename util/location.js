const GOOGLE_API_KEY = 'AIzaSyBE9Z242GSfYH0ycqUa52P9p0vrNMIbtTg';

export const getMapPreview = (lat, lng) => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
};
export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address!');
    }
    const data = await response.json();
    let address;
    if (data.status === 'REQUEST_DENIED'){
         address = "Unknown";

    } else {
        address = data.results[0].formatted_address;
    }

    return address;
}
