import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#ffffff",
    },
    title: {
        marginBottom: 1,    
        fontSize: 20,
        fontWeight: "bold",
    },
    section: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 2,
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
    },
    kesimpulan: {
        marginTop: 7,
        fontSize: 16,
        fontWeight: "bold",
    },
});

const Datadiri = {
    nama: "Doni Arifitranto",
    berat: "70",
    tinggi: "173",
};

const Makanan = [
    { nama: "Sarapan", kalori: 350 },
    { nama: "Makan Siang", kalori: 500 },
    { nama: "Makan Malam", kalori: 400 },
    { nama: "Cemilan", kalori: 200 },
];

for (let i = 0; i < Makanan.length; i++) {
    Datadiri.kalori = (Datadiri.kalori || 0) + Makanan[i].kalori;
}

const konversiTinggi = Datadiri.tinggi / 100;

const bmi = Datadiri.berat / (konversiTinggi * konversiTinggi);

let statusBmi = bmi
if (bmi < 18.5) {
    statusBmi = "Kekurangan";
}else if (bmi >= 18.5 && bmi < 25) {
    statusBmi = "Ideal";
}else {
    statusBmi = "Kelebihan";
}

let statusKalori = Datadiri.kalori
if (Datadiri.kalori < 2000) {
    statusKalori = "Kurang";
}else if (Datadiri.kalori >= 2000 && Datadiri.kalori < 2500) {
    statusKalori = "Cukup";
}else {
    statusKalori = "Berlebih";
}

let kesimpulan = ""
if (statusBmi === "Ideal" && statusKalori === "Cukup") {
    kesimpulan = "Kondisi tubuh Anda ideal dan asupan kalori Anda cukup untuk kebutuhan harian.";
}else if (statusBmi === "Ideal" && statusKalori !== "Cukup") {
    kesimpulan = "Kondisi tubuh Anda ideal, tetapi asupan kalori Anda tidak cukup untuk kebutuhan harian.";
}else if (statusBmi !== "Ideal" && statusKalori === "Cukup") {
    kesimpulan = "Kondisi tubuh Anda tidak ideal, tetapi asupan kalori Anda cukup untuk kebutuhan harian.";
}else {
    kesimpulan = "Kondisi tubuh Anda tidak ideal dan asupan kalori Anda tidak cukup untuk kebutuhan harian.";
}

export default function Index() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
            <Text style={styles.title}>Evaluasi Berat Badan Ideal</Text>
            <Text style={styles.section}>Pasien</Text>
            <Text>Nama: {Datadiri.nama}</Text>
            <Text>Berat: {Datadiri.berat} kg</Text>
            <Text>Tinggi: {Datadiri.tinggi} cm</Text>
            <Text style={styles.section}>Porsi Makanan Harian</Text>
            {Makanan.map((makanan, index) => (
                <Text key={index}>{makanan.nama} - {makanan.kalori} kalori</Text>
            ))}
            <Text>Total Kalori - {Datadiri.kalori} kalori</Text>
            <Text style={styles.section}>Hasil Perhitungan</Text>
            <Text>BMI : {bmi.toFixed(2)}</Text>
            <Text>Status BMI : {statusBmi}</Text>
            <Text>Status Kalori : {statusKalori}</Text>
            <Text style={styles.kesimpulan}>{kesimpulan}</Text>
            </View>
        </SafeAreaView>
    );
}