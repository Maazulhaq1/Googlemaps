import React, { useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GeocoderScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchAddress = async () => {
    try {
      // You can use the query state for the address search
      // For example, you can send `query` to your backend to fetch address results.
      // Here, we'll just clear the results.
      setResults([]);
    } catch (error) {
      console.error('Error searching for address:', error);
      setResults([]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Search Address" onPress={searchAddress} />
      <GooglePlacesAutocomplete

        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q',
          language: 'en',
        }}
      />



      <FlatList
        data={results}
        keyExtractor={item => item.place_id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Text>Address: {item.formatted_address}</Text>
            <Text>Latitude: {item.geometry.location.lat}</Text>
            <Text>Longitude: {item.geometry.location.lng}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default GeocoderScreen;
