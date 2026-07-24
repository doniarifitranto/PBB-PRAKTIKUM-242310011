import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";

// List Stores Component
const ListStores = ({ stores = [] }) => {
  return (
    <View>
      {stores.map((store, index) => (
        <View key={index} style={styles.storeContainer}>
          <View style={styles.storeIcon}>
            <AntDesign name="shoppingcart" size={24} color="#49745e" />
          </View>
          <View style={styles.storeDetails}>
            <Text style={styles.storeName}>{store?.title || "Book Store"}</Text>
            <View style={styles.ratingRow}>
              <AntDesign name="star" size={14} color="#e8ab30" />
              <Text style={styles.ratingText}>
                4.5 &middot; Closes 10.00 PM &middot; (021) 1234-5678
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

// Map Component
const MapComponent = ({ current_location }) => {
  const region = current_location ? {
    latitude: current_location.latitude,
    longitude: current_location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  } : null;

  if (Platform.OS === "web") {
    return (
      <View style={[styles.map, styles.mapFallback]}>
        <Ionicons name="map-outline" size={80} color="#49745e" />
        <Text style={styles.mapFallbackText}>Map View Unavailable</Text>
        <Text style={styles.mapFallbackSubtext}>
          Maps are only available on Android and iOS devices
        </Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      region={region}
      showsUserLocation={true}
      showsCompass={true}
    >
      {current_location && (
        <Marker coordinate={{ latitude: current_location.latitude, longitude: current_location.longitude }} title="You are here" />
      )}
    </MapView>
  );
};

// Header Component
const Header = () => {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]} style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Main Explore Component
export default function Explore() {
  const bottomSheetRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const snapPoints = useMemo(() => ["35%", "50%", "90%"], []);
  const handleSheetChange = (index) => {
    if (index === -1) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Izin ditolak. Aplikasi membutuhkan akses lokasi.");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      let addressData = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      if (addressData.length > 0) {
        setAddress(addressData[0]);
      }
    })();
  }, []);

  const dummyStores = [
    { title: "The UBM Library" },
    { title: "Toko Buku NAS" },
    { title: "Stationery Gading Serpong" },
    { title: "Gramedia Summarecon Mall Serpong" },
    { title: "Mentari Books Serpong" },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapComponent current_location={location} />
      <Header />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        onChange={handleSheetChange}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} opacity={0.5} appearsOnIndex={1} disappearsOnIndex={0} />
        )}
        backgroundStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "white",
        }}
      >
        <BottomSheetScrollView>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Explore Store</Text>
            {address && (
              <Text style={styles.sheetSubtitle}>
                Location: {address.city || address.subregion || address.name || "Tidak tersedia"},{" "}
                {address.region || "-"}
              </Text>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <ListStores stores={dummyStores} />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  mapFallback: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f6f1",
  },
  mapFallbackText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  mapFallbackSubtext: {
    fontSize: 14,
    color: "gray",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingTop: 10,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sheetHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  sheetSubtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 5,
  },
  storeContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  storeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e8f1ec",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  storeDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 5,
  },
});
