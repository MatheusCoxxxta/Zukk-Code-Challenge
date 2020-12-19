import React from 'react';
import {StyleSheet} from 'react-native';

import {View} from 'react-native';

import {MapParentBox} from './styles';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF0aGV1c2Nvc3RhMjciLCJhIjoiY2tpdXo2MXNuMDU0bzJxcXR5NmF2bG1oeSJ9.pvbXRP9FDpW2IQYi77HM8w',
);

const points = [
  [3.33624, 6.57901],
  [3.3750014, 6.5367877],
];

const Map = () => {
  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera />
        <MapParentBox>
          {points.map((point) => (
            <MapboxGL.PointAnnotation
              key={point[0]}
              id="pointAnnotation"
              coordinate={point}>
              <View style={styles.mapStyle} />
            </MapboxGL.PointAnnotation>
          ))}
        </MapParentBox>
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  mapStyle: {
    height: 30,
    width: 30,
    backgroundColor: '#00cccc',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
});

export default Map;
