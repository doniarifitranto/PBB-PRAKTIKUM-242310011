import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../../constants/list_books";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const book = ListBook.find((book) => book.id === parseInt(id));
  const router = useRouter();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    checkAuth();
    return () => {
      Speech.stop();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (!userDataString) {
        Alert.alert(
          "Login Required",
          "Please sign in to read this book",
          [
            { text: "Cancel", style: "cancel", onPress: () => router.back() },
            { text: "Sign In", onPress: () => router.replace("/module-latihan/latihan8/signin") }
          ]
        );
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    }
  };

  const handlePlay = () => {
    if (isPaused) {
      Speech.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    } else {
      Speech.speak(book.sinopsis, {
        onStart: () => setIsSpeaking(true),
        onDone: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        },
        onStopped: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        },
        onError: () => {
          setIsSpeaking(false);
          setIsPaused(false);
        }
      });
    }
  };

  const handlePause = () => {
    Speech.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  };

  const handleStop = () => {
    Speech.stop();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Buku tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-social" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.bookInfoContainer}>
          <Image source={book.img} style={styles.coverImage} resizeMode="cover" />
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={16} color="#e8ab30" />
            <Text style={styles.ratingText}>{book.rating}/5.0</Text>
          </View>
          <TouchableOpacity style={styles.readButton}>
            <Text style={styles.readButtonText}>Read Book</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.synopsisContainer}>
          <Text style={styles.synopsisTitle}>SINOPSIS</Text>
          <Text style={[styles.synopsisText, isSpeaking && styles.synopsisTextHighlight]}>
            {book.sinopsis}
          </Text>
        </View>

        {/* Audio Player Controls */}
        <View style={styles.playerContainer}>
          <TouchableOpacity onPress={handleStop} style={styles.controlButton}>
            <Ionicons name="stop" size={24} color="white" />
          </TouchableOpacity>

          {!isSpeaking && !isPaused ? (
            <TouchableOpacity onPress={handlePlay} style={styles.playButton}>
              <Ionicons name="play" size={32} color="white" />
            </TouchableOpacity>
          ) : isPaused ? (
            <TouchableOpacity onPress={handlePlay} style={styles.playButton}>
              <Ionicons name="play" size={32} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePause} style={styles.playButton}>
              <Ionicons name="pause" size={32} color="white" />
            </TouchableOpacity>
          )}
          
          <Text style={styles.readingText}>
            {isSpeaking ? "Reading..." : isPaused ? "Paused" : "Audio-book"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2b33", // Dark background for the detail page to match design
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  shareButton: {
    padding: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    paddingBottom: 30,
  },
  bookInfoContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  coverImage: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: "#a0aab2",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    color: "white",
    marginLeft: 5,
    fontSize: 14,
  },
  readButton: {
    backgroundColor: "#49745e",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  readButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  synopsisContainer: {
    padding: 20,
    marginTop: 10,
  },
  synopsisTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  synopsisText: {
    fontSize: 14,
    color: "#d0d6d9",
    lineHeight: 22,
  },
  synopsisTextHighlight: {
    color: "#e8ab30",
    backgroundColor: "rgba(232, 171, 48, 0.2)",
  },
  playerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#2c3e4c",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
  },
  playButton: {
    backgroundColor: "#49745e",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  controlButton: {
    backgroundColor: "#5a6b75",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  readingText: {
    color: "white",
    marginLeft: 10,
    fontSize: 14,
  }
});
