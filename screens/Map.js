import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";
const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationHanlder(event) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location Picked!",
        "You have to pick the location by tapping on the map"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation, initialLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        return (
          <IconButton
            icon="save"
            size={24}
            color={tintColor}
            onPress={savePickedLocationHandler}
          />
        );
      },
    });
  }, [navigation, savePickedLocationHandler]);
  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHanlder}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
