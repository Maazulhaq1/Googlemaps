import React from 'react';
import { StyleSheet, View } from 'react-native';
import StreetView from 'react-native-streetview';


const StreetViewNew = () => {
    return (
        <View style={styles.container}>
            <StreetView
                style={styles.streetView}
                allGesturesEnabled={true}
                coordinate={{
                    latitude: 53.5444,
                    longitude: -113.4909,
                    
                }}
                pov={{
                    tilt: parseFloat(0),
                    bearing: parseFloat(0),
                    zoom: parseInt(5)
                }}
            />
        </View>
    )
}

export default StreetViewNew

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    streetView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    streetView: {
        ...StyleSheet.absoluteFillObject,
    }
});