import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { color_list, styles } from "../styles/StyleApps";

export default function SearchBar({ value, setValue }) {
  return (
    <View style={styles.h_container}>
      <View style={style_searchBar.search_container}>
        <Ionicons name="search-outline" size={16} color="gray" />
        <TextInput
          autoFocus
          placeholder="Search here"
          value={value}
          onChangeText={(text) => setValue(text)}
          style={style_searchBar.input}
          underlineColorAndroid="transparent"
        />
      </View>
    </View>
  );
}

const style_searchBar = StyleSheet.create({
  search_container: {
    backgroundColor: color_list.white,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Platform.OS === "ios" ? 10 : 15,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    ...Platform.select({
      web: {
        outlineStyle: "none"
      },
    }),
  },
});