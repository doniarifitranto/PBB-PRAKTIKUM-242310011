import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9CDCF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function index() {
  return (
    <View style={styles.container}>
      <Text> Selamat Datang di Pemrograman Perangkat Bergerak </Text>
      <Text> Nama : Doni Arifitranto</Text>
      <Text> NPM : 242310011</Text>
      <Text> Prodi : Teknologi Informasi </Text>
      <Text> Angkatan : 2024 </Text>
      <Text> Kelas : TI-24-PA </Text>
    </View>
  );
}