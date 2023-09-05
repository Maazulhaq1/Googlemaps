import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
Geolocation.setRNConfiguration(config);
navigator.geolocation = require('@react-native-community/geolocation');

const MapScreen = () => {
    
    
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [destination, setDestination] = useState({ latitude: 0, longitude: 0 });
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        // Get the user's current location
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setRegion({
                    ...region,
                    latitude,
                    longitude,
                });
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        // Set the destination coordinates (you can replace these with your desired destination)
        setDestination({
            latitude: DESTINATION_LATITUDE,
            longitude: DESTINATION_LONGITUDE,
        });

        // Fetch directions from Google Maps Directions API
        fetchDirections();
    }, []);

    const fetchDirections = async () => {
        const origin = `${region.latitude},${region.longitude}`;
        const destinationStr = `${destination.latitude},${destination.longitude}`;
        const apiKey = 'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q';

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationStr}&key=${apiKey}`
            );
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const points = data.routes[0].overview_polyline.points;
                const decodedPoints = Polyline.decode(points);

                const polylineCoords = decodedPoints.map((point) => ({
                    latitude: point[0],
                    longitude: point[1],
                }));

                setDirections(polylineCoords);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region}>
                <Marker coordinate={region} title="My Location" />
                <Marker coordinate={destination} title="Destination" />
                <Polyline coordinates={directions} strokeWidth={3} />
            </MapView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default MapScreen;
