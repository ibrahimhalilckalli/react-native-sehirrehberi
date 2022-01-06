import React, {Component} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Header} from 'react-native-elements';
import PlaceMap from './PlaceMap';

export default class PlaceList extends Component {
  render() {
    console.disableYellowBox = true;
    const reviews = this.props.navigation.state.params.PlaceDetail;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header
          backgroundColor="#0275D8"
          centerComponent={{
            text: 'Mekanlar',
            style: {color: '#fff', fontSize: 20},
          }}
        />
        <View style={styles.container}>
          <PlaceMap />
        </View>
        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ReviewDetails', item)
              }>
              <Text style={styles.item}>{">"} {item.type} / {item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    padding: 10,
    marginVertical: 2,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  container: {
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
