import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

class Search extends Component {
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
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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
            initialRegion={this.state.region}
            showsUserLocation={true}
            showsCompass={true}
            rotateEnabled={false}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
          />
          <Text>Latitude: {this.state.region.latitude} </Text>
          <Text>Longitude: {this.state.region.longitude} </Text>
        </View>
      );
    }
    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Search;
