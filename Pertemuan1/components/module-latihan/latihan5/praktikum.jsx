import { useMemo, useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListBook } from "../../../constants/list_books";

import BookCollections from "./components/BookCollections";
import PagingComponent from "./components/PagingComponent";
import SearchBar from "./components/SearchBar";
import { styles } from "./styles/StyleApps";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(ListBook);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const BookDataMemori = useMemo(() => {
    let computedData = [...books];

    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value != null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            console.error(`Error processing key "${key}":`, error);
            return false;
          }
        });
      });
    }

    setTotalItems(computedData.length);

    if (computedData.length > 0) {
      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
      );
    } else {
      return [];
    }
  }, [search, books, currentPage]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <SearchBar value={search} setValue={setSearch} />
      <ScrollView style={{ flex: 1 }}>
        <BookCollections books={BookDataMemori} />
        {totalItems > 0 && (
          <PagingComponent
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}