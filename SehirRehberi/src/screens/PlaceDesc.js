import React, {Component} from 'react';
import {ScrollView, Text, StyleSheet, Button, Image} from 'react-native';
import Tts from 'react-native-tts';
import HtmlEntities from '../components/Translate/TextSupport';
import {Header} from 'react-native-elements';

Tts.setDefaultLanguage('tr-TR');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
class PlaceDesc extends Component {
  render() {
    console.disableYellowBox = true;
    const text = HtmlEntities.decode(
      this.props.navigation.getParam('description'),
    );
    const imageUrl = this.props.navigation.getParam('images');
    const imageLink =
      'https://www.kulturportali.gov.tr' +
      (imageUrl != null ? imageUrl[0] : null);
    return (
      <ScrollView style={styles.contentContainer}>
        <Header
          backgroundColor="#0275D8"
          centerComponent={{
            text: this.props.navigation.getParam('title'),
            style: {color: '#fff', fontSize: 20},
          }}
        />
        <Image
          style={styles.tinyLogo}
          source={{
            uri: imageLink,
          }}
        />
        <Text style={styles.titleText}>
          {this.props.navigation.getParam('title')}
        </Text>
        <Text style={styles.item}>{text}</Text>
        <Text style={styles.adress}>
          Adres: {this.props.navigation.getParam('address')}
        </Text>
        <Button  title="Dinle" onPress={() => Tts.speak(text)} />
        <Button 
          color="red"
          title="Durdur" onPress={() => Tts.stop()} />
      </ScrollView>
    );
  }
}

export default PlaceDesc;

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
  contentContainer: {
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'center',
    fontSize: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 500,
    height: 250,
  },
  adress: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    fontSize: 20,
    color: 'red',
  },
  buttonColor:{
    backgroundColor: 'red',
  },
});
