import React, {Component} from 'react';
import {Text, Button, View, StyleSheet, StatusBar} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RNPickerSelect from 'react-native-picker-select';
import getNearest from '..';
import places from '../data/places';
import SplashScreen from 'react-native-splash-screen';
import {Header} from 'react-native-elements';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      placeType: null,
      placeDistance: null,
    };
  }
  static navigationOptions = {
    headerStyle: {marginTop: 24},
  };
  _getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({region: region});
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };
  componentDidMount() {
    SplashScreen.hide();
    this._getLocation();
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('#0275D8');
  }

  render() {
    console.disableYellowBox = true;
    const allType = [
      'Anıt',
      'Anıt Mezar',
      'Antik Kent',
      'Askeri Mimari',
      'Bedesten',
      'Cami',
      'Çarşı',
      ' Çeşme',
      'Darüşşifa',
      'Dini Mimari',
      'Fabrika',
    ];
    const placeholder = {
      label: 'Seçiniz',
      value: null,
    };
    
    if (this.state.region) {
      return (
        <View>
          <Header
            backgroundColor="#0275D8"
            leftComponent={{icon: 'menu', color: '#fff'}}
            centerComponent={{
              text: 'Hoşgeldiniz',
              style: {color: '#fff', fontSize: 20},
            }}
            rightComponent={{icon: 'about', color: '#fff'}}
          />
          <Text>Tür Seçiniz</Text>
          <RNPickerSelect
            style={styles.title}
            onValueChange={value => this.setState({placeType: value})}
            placeholder={placeholder}
            items={[
              {label: 'Tümü', value: allType},
              {label: 'Anıt', value: 'Anıt'},
              {label: 'Anıt Mezar', value: 'Anıt Mezar'},
              {label: 'Antik Kent', value: 'Antik Kent'},
              {label: 'Askeri Mimari', value: 'Askeri Mimari'},
              {label: 'Bedesten', value: 'Bedesten'},
              {label: 'Cami', value: 'Cami'},
              {label: 'Çarşı', value: 'Çarşı'},
              {label: 'Çeşme', value: 'Çeşme'},
              {label: 'Darüşşifa', value: 'Darüşşifa'},
              {label: 'Dini Mimari', value: 'Dini Mimari'},
              {label: 'Fabrika', value: 'Fabrika'},
            ]}
          />
          <Text>Mesafe Seçiniz</Text>
          <RNPickerSelect
            style={styles.title}
            onValueChange={value => this.setState({placeDistance: value})}
            placeholder={placeholder}
            items={[
              {label: '10 KM', value: '10000'},
              {label: '50 KM', value: '50000'},
              {label: '100 KM', value: '100000'},
            ]}
          />
          <Button
            title="Ara"
            onPress={() =>
              this.props.navigation.navigate('Detail', {
                PlaceDetail: getNearest({
                  places: places,
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                  distance: this.state.placeDistance,
                  types: this.state.placeType,
                  limit: 10,
                }),
                region: this.state.region,
              })
            }
          />
        </View>
      );
    }
    return <View />;
  }
}

export default Search;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  /*title: {
    borderWidth: 5,
    borderColor: '#000000',
    textAlign: 'center',
  },
*/
});
