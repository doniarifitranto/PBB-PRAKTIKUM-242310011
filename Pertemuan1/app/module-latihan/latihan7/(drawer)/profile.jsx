import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ProfileScreen() {
  const [avatarUri, setAvatarUri] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [phone, setPhone] = useState("081234567890");
  const [email, setEmail] = useState("anton.sukamto@ibik.ac.id");
  const [address, setAddress] = useState("Jl. Rangga Gading No.01, Gudang, Kecamatan...");

  const handleOpenCamera = async () => {
    if (!permission) {
      const status = await requestPermission();
      if (!status.granted) {
        Alert.alert("Permission Denied", "Camera permission is required to take photos");
        return;
      }
    } else if (!permission.granted) {
      const status = await requestPermission();
      if (!status.granted) {
        Alert.alert("Permission Denied", "Camera permission is required to take photos");
        return;
      }
    }
    setIsCameraVisible(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setAvatarUri(photo.uri);
        setIsCameraVisible(false);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery permission is required to select photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Change Avatar",
      "Choose an option",
      [
        { text: "Take Photo", onPress: handleOpenCamera },
        { text: "Choose from Gallery", onPress: pickImageFromGallery },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.avatarContainer} onPress={showImagePickerOptions}>
          <Image
            source={avatarUri ? { uri: avatarUri } : require("../../../../assets/avatars/avatar.png")}
            style={styles.img_avatar}
            resizeMode="cover"
          />
          <View style={styles.cameraIconOverlay}>
            <FontAwesome name="edit" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.nameText}>Anton Sukamto</Text>
        <Text style={styles.npmText}>20200101</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} />
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isCameraVisible} animationType="slide" onRequestClose={() => setIsCameraVisible(false)}>
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="front"
            mode="picture"
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsCameraVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              
              <View style={{ width: 80 }} />
            </View>
          </CameraView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  img_avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#49745e",
  },
  cameraIconOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#49745e",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  npmText: {
    fontSize: 14,
    color: "gray",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: "#49745e",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  cancelButton: {
    padding: 10,
    width: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
});
