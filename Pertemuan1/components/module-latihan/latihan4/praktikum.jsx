import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../constants/list_books";
import BookCollectioins from "../latihan4/components/BookCollections";
import Categoriesnav from "../latihan4/components/Categories";
import CTABook from "../latihan4/components/CTABook";
import Header from "../latihan4/components/Header";
import { useState } from "react";
import { color_list, styles } from "./styles/StyleApps";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const[searchText, setSearchText] = useState("");
  
  const lastBook = ListBook[ListBook.length - 1];
  const filteredBooks = ListBook.filter((book) => {
    const keyword = searchText.toLowerCase();
    return (
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword)
    );
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {/* HEADER */}
      <Header 
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {/* END HEADER */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* MAIN CONTENT */}
        <View style={{ flex: 1 }}>
          <CTABook book={lastBook} />
          <Categoriesnav />
          <BookCollectioins books={filteredBooks} />
        </View>
        {/* MAIN CONTENT */}

        {/* FOOTER */}
        <View>
          <Text style={{ color: color_list.green }}>
            &copy; 2026 Febry Damatraseta Fairuz
          </Text>
        </View>
        {/* END FOOTER */}
      </ScrollView>
    </SafeAreaView>
  );
}
