import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import Header from './Components/Header';
import Map from './Components/Map';
import Footer from './Components/Footer';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MapboxGL from '@react-native-mapbox-gl/maps';
import PointsArray from '../../mock/PointsArray';
import getRealm from '../../services/realm';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF0aGV1c2Nvc3RhMjciLCJhIjoiY2tpdXo2MXNuMDU0bzJxcXR5NmF2bG1oeSJ9.pvbXRP9FDpW2IQYi77HM8w',
);

const generateId = () => {
  return Date.now() + Math.floor(Math.random() * Math.floor(99999));
};

const Home = () => {
  useEffect(() => {
    const getPoints = async () => {
      const realm = await getRealm();

      const data = realm.objects('Point');

      console.log(data);
    };

    getPoints();
  }, []);

  const savePoint = async (lat: number, long: number) => {
    const pointId = generateId();

    const data = {
      id: pointId,
      lat,
      long,
    };

    console.log(data);

    const realm = await getRealm();

    try {
      realm.write(() => {
        realm.create('Point', data);
      });
    } catch (error) {
      console.log('Erro!');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Map pointsProps={PointsArray} savePoint={savePoint} />
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    padding: 20,
  },
});

export default Home;
