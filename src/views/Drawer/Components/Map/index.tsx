import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {View} from 'react-native';

import {MapParentBox} from './styles';

import MapboxGL from '@react-native-mapbox-gl/maps';
import {Feature, Geometry, GeoJsonProperties} from 'geojson';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF0aGV1c2Nvc3RhMjciLCJhIjoiY2tpdXo2MXNuMDU0bzJxcXR5NmF2bG1oeSJ9.pvbXRP9FDpW2IQYi77HM8w',
);

const Map = (props: {
  pointsProps: any;
  savePoint: (lat: number, long: number) => void;
}) => {
  const {pointsProps} = props;
  console.log(pointsProps[0]);

  const [point, setPoint] = useState<any>();

  const [pointLat, setPointLat] = useState<any>();
  const [pointLong, setPointLong] = useState<any>();

  const handleSavePoint = async (e: Feature<Geometry, GeoJsonProperties>) => {
    setPoint(e.geometry.coordinates); // lint bug => no sintaxe error

    setPointLat(e.geometry.coordinates[0]);
    setPointLong(e.geometry.coordinates[1]);

    props.savePoint(pointLat, pointLong);
  };

  return (
    <View style={styles.mapGeneral}>
      <MapboxGL.MapView onPress={(e) => handleSavePoint(e)} style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={15}
          centerCoordinate={[-45.88108891799865, -23.198347902841164]}
        />
        <MapParentBox>
          {pointsProps !== []
            ? pointsProps.map((myPoint: any) => (
                <MapboxGL.PointAnnotation
                  key={myPoint.id}
                  id="pointAnnotation"
                  coordinate={[myPoint.lat, myPoint.long]}>
                  <View style={styles.pointStyle} />
                </MapboxGL.PointAnnotation>
              ))
            : null}

          {point ? (
            <MapboxGL.PointAnnotation
              key={point[0]}
              id="pointAnnotation"
              coordinate={point}>
              <View style={styles.pointStyle} />
            </MapboxGL.PointAnnotation>
          ) : null}
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
