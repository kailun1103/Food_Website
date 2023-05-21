import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const GoogleMapAPI = ({ address }) => {
    const [mapCenter, setMapCenter] = useState({
        lat: 40.7128,
        lng: -74.0060,
    });

    const mapOptions = {
        zoom: 10,
    };

    useEffect(() => {
        const getAddressLatLng = async () => {
            try {
                const results = await geocodeByAddress(address);
                const latLng = await getLatLng(results[0]);
                setMapCenter(latLng);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAddressLatLng();
    }, [address]);

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyDNDPLcHPkxwljg7ca3UPjjkHy0qNIQhdc',
                }}
                center={mapCenter}
                defaultZoom={mapOptions.zoom}
            >
                {/* Add any map components, such as markers or overlays, here */}
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMapAPI;
