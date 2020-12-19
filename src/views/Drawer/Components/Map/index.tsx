import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {View} from 'react-native';

import {MapParentBox} from './styles';

import MapboxGL from '@react-native-mapbox-gl/maps';
import {Feature, Geometry, GeoJsonProperties} from 'geojson';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF0aGV1c2Nvc3RhMjciLCJhIjoiY2tpdXo2MXNuMDU0bzJxcXR5NmF2bG1oeSJ9.pvbXRP9FDpW2IQYi77HM8w',
);

const Map = (props: {pointsProps: any}) => {
  const {pointsProps} = props;

  const [points, setPoints] = useState<any>(pointsProps);
  const [point, setPoint] = useState<any>();

  const handleSave = async (e: Feature<Geometry, GeoJsonProperties>) => {
    setPoint(e);
    setPoints({type: 'Feature', features: [...pointsProps.features, e]});
    console.log({type: 'Feature', features: [...pointsProps.features, e]});
  };

  return (
    <View style={styles.mapGeneral}>
      <MapboxGL.MapView onPress={(e) => handleSave(e)} style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={15}
          centerCoordinate={[-45.88108891799865, -23.198347902841164]}
        />
        <MapParentBox>
          <MapboxGL.ShapeSource
            hitbox={{width: 10, height: 10}}
            id="exampleShapeSource"
            shape={points}>
            <MapboxGL.CircleLayer
              id="pointCircles"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                circleStrokeColor: '#FFF',
                circleStrokeWidth: 2,
                circleRadius: 15,
                circleColor: '#459',
              }}
            />
          </MapboxGL.ShapeSource>
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
  mapGeneral: {flex: 1, height: '100%', width: '100%'},
});

export default Map;
