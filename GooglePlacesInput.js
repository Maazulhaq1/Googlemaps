import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    
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
      
    





  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({});
