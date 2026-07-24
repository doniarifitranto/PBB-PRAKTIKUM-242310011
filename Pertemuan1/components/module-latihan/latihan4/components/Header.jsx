import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/StyleApps";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({
  showSearch,
  setShowSearch,
  searchText,
  setSearchText,
}) {
  const inputRef = useRef(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString !== null) {
        setUserData(JSON.parse(userDataString));
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.warn("Error checking login status:", error);
    }
  };

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100)
    }
  }, [showSearch]);

  return (
    <View style={styles.h_container}>
      {showSearch ? (
        <View style={{ flex: 1 }}>
          <TextInput
            ref={inputRef}
            placeholder="Search book or author..."
            value={searchText}
            onChangeText={setSearchText}
            onBlur={() => {
              if (searchText.trim()===""){
                setShowSearch(false)
              }
            }}
            style={styles.search_input}
          />
        </View>
      ) : (
        <>
          <View>
            <Text style={styles.sub_title}>Good Morning</Text>
            <Text style={styles.title}>{userData?.username || "Discover Books"}</Text>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              style={[styles.btn_icon, styles.shadow]}
            >
              <Ionicons
                name={showSearch ? "close-outline" : "search-outline"}
                size={20}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn_icon}>
              <Ionicons name="notifications-outline" size={20} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
