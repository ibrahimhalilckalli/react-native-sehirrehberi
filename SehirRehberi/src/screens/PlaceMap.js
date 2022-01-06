import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

class PlaceMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
    };
  }

  _getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };
        this.setState({region: region});
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };
  componentDidMount() {
    this._getLocation();
  }

  render() {
    if (this.state.region) {
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={this.state.region}
            showsUserLocation={true}
            showsCompass={true}
            rotateEnabled={false}
          />
        </View>
      );
    }
    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 250,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PlaceMap;
