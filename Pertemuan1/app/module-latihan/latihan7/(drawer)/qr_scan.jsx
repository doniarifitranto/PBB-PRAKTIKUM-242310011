import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Assuming the QR code contains the book ID
    const bookId = parseInt(data);
    if (!isNaN(bookId)) {
      router.push(`/module-latihan/latihan7/detail/${bookId}`);
    } else {
      alert(`Scanned data: ${data}. Not a valid Book ID.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Arahkan kamera ke QR Code Buku</Text>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      </View>
      {scanned && (
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
          <Text style={styles.scanButtonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#49745e",
  },
  cameraContainer: {
    width: 300,
    height: 300,
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#49745e",
  },
  camera: {
    flex: 1,
  },
  scanButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e8ab30",
    borderRadius: 10,
  },
  scanButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
