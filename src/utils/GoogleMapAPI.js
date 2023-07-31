import React, { useEffect, useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';

const GoogleMapAPI = ({ address }) => {
    const [mapCenter, setMapCenter] = useState({
        lat: 24.9864017,
        lng: 121.5708522,
    });
    const [mapKey, setMapKey] = useState(0);
    const mapOptions = {
        zoom: 15,
    };

    useEffect(() => {
        const getAddressLatLng = async () => {
            try {
                const results = await geocodeByAddress(address);
                const latLng = await getLatLng(results[0]);
                setMapCenter(latLng);
                setMapKey(prevKey => prevKey + 1);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAddressLatLng();
    }, [address]);


    return (
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMap
                zoom={mapOptions.zoom}
                center={mapCenter}
                mapContainerStyle={{ height: '100%', width: '100%' }}
                options={{
                    apiKey: 'AIzaSyDNDPLcHPkxwljg7ca3UPjjkHy0qNIQhdc', // Replace with your actual API key
                }}
                key={mapKey}
            >
                <Marker position={mapCenter} />
            </GoogleMap>
        </div>
    );
};

export default GoogleMapAPI;