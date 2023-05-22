import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlace } from "../util/database";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlace();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
