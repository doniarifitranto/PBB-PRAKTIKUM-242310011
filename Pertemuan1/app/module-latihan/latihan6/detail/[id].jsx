import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../../constants/list_books";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const book = ListBook.find((book) => book.id === parseInt(id));
  const router = useRouter();

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
          <Text style={styles.synopsisText}>{book.sinopsis}</Text>
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
});
