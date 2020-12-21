import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import Header from './Components/Header';
import Map from './Components/Map';
import Footer from './Components/Footer';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MapboxGL from '@react-native-mapbox-gl/maps';
import getRealm from '../../services/realm';
import {useNavigation} from '@react-navigation/native';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF0aGV1c2Nvc3RhMjciLCJhIjoiY2tpdXo2MXNuMDU0bzJxcXR5NmF2bG1oeSJ9.pvbXRP9FDpW2IQYi77HM8w',
);

const Home = () => {
  const [PointsArray, setPointsArray] = useState([]);

  const navigation = useNavigation();

  const getPoints = async () => {
    const realm = await getRealm();

    try {
      setPointsArray(Array.from(realm.objects('Point')));
    } catch (error) {
      Platform.OS !== 'android'
        ? Alert.alert(
            'Ocorreu um erro!',
            'Algo falhou ao tentar carregar pontos...',
            [
              {
                text: 'Ok',
                style: 'cancel',
              },
            ],
          )
        : ToastAndroid.show(
            'Algo falhou ao tentar carregar pontos...',
            ToastAndroid.LONG,
          );
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPoints();
    });
    return unsubscribe;
  }, [navigation]);

  const deletePoint = async (point: number) => {
    const realm = await getRealm();
    try {
      realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('Point', point));
      });
    } catch (error) {
      Platform.OS !== 'android'
        ? Alert.alert(
            'Ocorreu um erro!',
            'Algo falhou ao tentar deletar o ponto...',
            [
              {
                text: 'Ok',
                style: 'cancel',
              },
            ],
          )
        : ToastAndroid.show(
            'Algo falhou ao tentar deletar o ponto...',
            ToastAndroid.LONG,
          );
    }

    getPoints();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Map pointsProps={PointsArray} deletePoint={deletePoint} />
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
