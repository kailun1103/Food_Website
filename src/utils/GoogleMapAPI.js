import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const GoogleMapAPI = ({ address }) => {
    const [mapCenter, setMapCenter] = useState({
        lat: 40.7128,
        lng: -74.0060,
    });
    const [mapKey, setMapKey] = useState(0);
    const [destinationMarker, setDestinationMarker] = useState(null);

    const mapOptions = {
        zoom: 15,
    };

    useEffect(() => {
        const getAddressLatLng = async () => {
            try {
                const results = await geocodeByAddress(address);
                const latLng = await getLatLng(results[0]);
                setMapCenter(latLng);
                setDestinationMarker({
                    lat: latLng.lat,
                    lng: latLng.lng,
                });
                setMapKey((prevKey) => prevKey + 1); // Update the key to trigger re-rendering of the map component
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAddressLatLng();
    }, [address]);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyDNDPLcHPkxwljg7ca3UPjjkHy0qNIQhdc',
                }}
                center={mapCenter}
                defaultZoom={mapOptions.zoom}
                key={mapKey} // Use the mapKey as the key prop to trigger re-rendering of the map component
            >
                {destinationMarker && (
                    <Marker
                        lat={destinationMarker.lat}
                        lng={destinationMarker.lng}
                    />
                )}
            </GoogleMapReact>
        </div>
    );
};

const Marker = () => <div style={{
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'red',
}} />;

export default GoogleMapAPI;
