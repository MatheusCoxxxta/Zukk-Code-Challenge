import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, ActivityIndicator} from 'react-native';
import {MapParentBox, Foot, Button, ButtonText} from './styles';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Feature, Geometry, GeoJsonProperties} from 'geojson';
import {useNavigation} from '@react-navigation/native';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF0aGV1c2Nvc3RhMjciLCJhIjoiY2tpdXo2MXNuMDU0bzJxcXR5NmF2bG1oeSJ9.pvbXRP9FDpW2IQYi77HM8w',
);

const Map = (props: {
  pointsProps: any;
  savePoint: (lat: number, long: number) => void;
}) => {
  const {pointsProps} = props;

  const [point, setPoint] = useState<any>();
  const [pointLat, setPointLat] = useState<any>();
  const [pointLong, setPointLong] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  const navigation = useNavigation();

  const creatingNewPoint = async (e: Feature<Geometry, GeoJsonProperties>) => {
    setPoint(e.geometry.coordinates); // lint bug => no sintaxe error

    setPointLat(e.geometry.coordinates[0]);
    setPointLong(e.geometry.coordinates[1]);
  };

  const handleSavePoint = () => {
    setLoading(true);
    if (pointLat && pointLong) {
      props.savePoint(pointLat, pointLong);
      navigation.goBack();
    }
  };

  return (
    <>
      <View style={styles.mapGeneral}>
        <MapboxGL.MapView
          onPress={(e) => creatingNewPoint(e)}
          style={styles.map}>
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
      <Foot>
        {!loading ? (
          <Button
            disabled={!point ? true : false}
            style={!point ? styles.btnDisabled : null}
            onPress={() => handleSavePoint()}>
            <ButtonText> Salvar </ButtonText>
          </Button>
        ) : (
          <ActivityIndicator size="small" color="#459" />
        )}
      </Foot>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  pointStyle: {
    height: 30,
    width: 30,
    backgroundColor: '#459',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
  mapGeneral: {flex: 1, height: '100%', width: '100%'},
  btnDisabled: {
    backgroundColor: '#CCC',
  },
});

export default Map;
