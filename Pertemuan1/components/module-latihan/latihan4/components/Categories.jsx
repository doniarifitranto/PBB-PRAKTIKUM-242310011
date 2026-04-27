import { View, Text, TouchableOpacity } from "react-native";
import { color_list } from "../styles/StyleApps";

export default function Categories() {
  const data = ["All", "Free", "Premium", "Popular"];

  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 20,
            marginRight: 10,
            backgroundColor:
              item === "All"
                ? color_list.green
                : color_list.green_light,
          }}
        >
          <Text
            style={{
              color: item === "All" ? "#fff" : "#000",
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}