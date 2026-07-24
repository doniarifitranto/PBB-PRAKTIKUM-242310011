import { Drawer } from "expo-router/drawer";
import "react-native-reanimated";

export default function TabLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#49745e",
        drawerInactiveTintColor: "gray",
        drawerStyle: {
          backgroundColor: "#f8f6f1",
          width: 250,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#49745e",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "E-Catalog Buku",
        }}
      />
      <Drawer.Screen
        name="premium"
        options={{
          drawerLabel: "Buku Premium",
          title: "Buku Premium",
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
        }}
      />
    </Drawer>
  );
}

const color_list = {
  orange: "#e8ab30", // Warna orange untuk premium badge
  green: "#49745e", // Warna hijau utama (untuk tab aktif)
  green_light: "#49745e35", // Warna hijau transparan
  cream: "#f8f6f1", // Warna cream untuk background
  white: "#fff", // Warna putih
};