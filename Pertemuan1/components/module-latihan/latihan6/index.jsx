import { Link, useRouter } from "expo-router";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Latihan6() {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={"dark-content"} />
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
            }}>
                <Text>First Screen</Text>
                <Link href={"/module-latihan/latihan6/screen2"} push asChild>
                    <Button title="Go to Screen 2" />
                </Link>
                <Button
                    title="Go to Third Screen"
                    onPress={() => router.push("/module-latihan/latihan6/screen3")}
                />
            </View>
        </SafeAreaView>
    );
}