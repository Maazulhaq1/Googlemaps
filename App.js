import { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native'; // Import Animated
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


Geocoder.init("AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q");


const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const waypoints = [
    { latitude: 37.8096386, longitude: -121.4216555, pinColor: 'red' },
    { latitude: 37.7665258, longitude: -121.4161648, pinColor: 'purple' },
    // Add more waypoints with different pinColors
];

// const GOOGLE_MAPS_APIKEY = 'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q';

export default () => {
    // Define the coordinates for the polyline
    // const coordinates = [
    //     { latitude: 37.8025259, longitude: -122.4351431 }, // Example coordinate 1
    //     { latitude: 37.7896386, longitude: -122.421646 },  // Example coordinate 2
    //     { latitude: 37.7665248, longitude: -122.4161628 }, // Example coordinate 3
    //     // Add more coordinates as needed
    // ];
    // // Define the center coordinate and radius of the circle
    // const centerCoordinate = { latitude: 37.78825, longitude: -122.4324 }; // Example center coordinate
    // const circleRadius = 1000; // Radius in meters

    // // // Define the coordinates for the polygon
    // const coordinates = [
    //     { latitude: 37.8025259, longitude: -122.4351431 }, // Example coordinate 1
    //     { latitude: 37.7896386, longitude: -122.421646 },  // Example coordinate 2
    //     { latitude: 37.7665248, longitude: -122.4161628 }, // Example coordinate 3
    //     // Add more coordinates as needed
    // ];
    const [query, setQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const mapRef = useRef(null); // Create a ref for the MapView

    const searchLocation = (data, details) => {
        const { description } = details;
        Geocoder.from(description)
            .then(json => {
                const { lat, lng } = json.results[0].geometry.location;
                setSelectedLocation({ latitude: lat, longitude: lng });

                // Animate the map to the selected location
                mapRef.current.animateToRegion({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                });
            })
            .catch(error => console.warn(error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.autocompleteContainer}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={searchLocation}
                    query={{
                        key: 'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q',
                        language: 'en',
                    }}
                />
            </View>

            <Animated.View style={[styles.mapContainer]}>
                <MapView
                    ref={mapRef} // Assign the ref to the MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    mapType='terrain'
                    initialRegion={{
                        latitude: 37.3318456,
                        longitude: -122.0296002,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                        // latitude: INITIAL_LATITUDE,
                        // longitude: INITIAL_LONGITUDE,
                        // latitudeDelta: LATITUDE_DELTA,
                        // longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    {selectedLocation && (
                        <Marker
                            coordinate={selectedLocation}
                            title={query}
                            description=''
                        />
                    )}
                    {/* Render the polygon */}
                    {/* <Polygon
                        coordinates={coordinates}
                        fillColor="rgba(100, 100, 200, 0.5)" // Fill color
                        strokeColor="rgba(0, 0, 255, 1)"   // Border color
                        strokeWidth={2}                    // Border width
                    /> */}
                    {/* { Render the circle } */}
                    {/* <Circle
                        center={centerCoordinate}
                        radius={circleRadius}
                        fillColor="rgba(100, 100, 200, 0.5)" // Fill color
                        strokeColor="rgba(0, 0, 255, 1)"   // Border color
                        strokeWidth={2}                    // Border width
                    /> */}
                    {/* Render the polyline */}
                    {/* <Polyline
                        coordinates={coordinates}
                        strokeColor="#3498db" // Polyline color
                        strokeWidth={4}      // Polyline width
                    /> */}
                    {/* Markers for origin and destination */}
                    <Marker coordinate={origin} title="Origin" />
                    <Marker coordinate={destination} title="Destination" />
                    {origin && (
                        <Marker
                            coordinate={origin}
                            title="Origin"
                            pinColor="blue"
                        />
                    )}
                    {destination && (
                        <Marker
                            coordinate={destination}
                            title="Destination"
                            pinColor="green"

                        />
                    )}
                    {/* Render waypoints with custom pinColor */}
                    {waypoints.map((waypoint, index) => (
                        <Marker
                            key={index}
                            coordinate={waypoint}
                            title={`Waypoint ${index + 1}`}
                            pinColor={waypoint.pinColor}
                        />
                    ))}

                    {/* Directions */}
                    {origin && destination && (
                        <MapViewDirections
                            origin={{
                                latitude: 37.3318456,
                                longitude: -122.0296002
                            }}
                            destination={{
                                latitude: 37.771707,
                                longitude: -122.4053769
                            }}

                            // origin={{ latitude: ORIGIN_LATITUDE, longitude: ORIGIN_LONGITUDE }}
                            // destination={{ latitude: DESTINATION_LATITUDE, longitude: DESTINATION_LONGITUDE }}
                            apikey={'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q'}
                            strokeWidth={6}
                            strokeColor="green"
                            optimizeWaypoints={true}
                        />

                    )}
                </MapView>
            </Animated.View>

            {/* <StreetViewNew /> */}
            {/* <MapScreen /> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        width: '100%',
        height: '100%',
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        position: 'absolute',
        zIndex: 0,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    autocompleteContainer: {
        height: 200,
        width: '80%',
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        top: 10,
        borderRadius: 50,
    },
    overlayImage: {
        width: '100%',
        height: '100%',
    },
});
