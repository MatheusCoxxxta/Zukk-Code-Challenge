import React from 'react';
import {StyleSheet} from 'react-native';

import {View} from 'react-native';

import {MapParentBox} from './styles';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF0aGV1c2Nvc3RhMjciLCJhIjoiY2tpdXo2MXNuMDU0bzJxcXR5NmF2bG1oeSJ9.pvbXRP9FDpW2IQYi77HM8w',
);

const Map = (props: {pointsProps: any}) => {
  const {pointsProps} = props;
  console.log(pointsProps[0]);

  const deletePoint = (point: any) => {
    console.log(point);
  };

  return (
    <View style={styles.mapGeneral}>
      <MapboxGL.MapView>
        <MapboxGL.Camera
          zoomLevel={15}
          centerCoordinate={[-45.88108891799865, -23.198347902841164]}
        />
        <MapParentBox>
          {pointsProps !== []
            ? pointsProps.map((point: any) => (
                <MapboxGL.PointAnnotation
                  key={point.id}
                  id="pointAnnotation"
                  onSelected={() => deletePoint(point)}
                  coordinate={[point.lat, point.long]}>
                  <View style={styles.pointStyle} />
                </MapboxGL.PointAnnotation>
              ))
            : null}
        </MapParentBox>
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  pointStyle: {
    height: 30,
    width: 30,
    backgroundColor: '#00cccc',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
  mapGeneral: {flex: 1, height: '100%', width: '100%'},
});

export default Map;
