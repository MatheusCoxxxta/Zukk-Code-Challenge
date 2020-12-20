import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import Header from './Components/Header';
import Map from './Components/Map';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MapboxGL from '@react-native-mapbox-gl/maps';
import getRealm from '../../services/realm';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF0aGV1c2Nvc3RhMjciLCJhIjoiY2tpdXo2MXNuMDU0bzJxcXR5NmF2bG1oeSJ9.pvbXRP9FDpW2IQYi77HM8w',
);

const generateId = () => {
  return Date.now() + Math.floor(Math.random() * Math.floor(99999));
};

const Home = () => {
  const [PointsArray, setPointsArray] = useState([]);

  useEffect(() => {
    const getPoints = async () => {
      const realm = await getRealm();

      try {
        setPointsArray(Array.from(realm.objects('Point')));
      } catch (error) {
        console.log(error);
      }
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
