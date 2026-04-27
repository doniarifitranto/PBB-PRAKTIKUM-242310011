import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { color_list, styles } from "../styles/StyleApps";

export default function BookCollections({ books }) {
  const sortedBooks = [...books].sort((a, b) => b.id - a.id);
  return (
    <View style={styles.container_book_collections}>
      <View style={styles.h_container}>
        <Text style={styles.container_book_collections_title}>
          Book Collection
        </Text>
        <Text style={{ color: color_list.green }}>See All</Text>
      </View>

      <BookList books={sortedBooks} />
    </View>
  );
}

const BookList = ({ books }) => {
  return (
    <View style={styles.book_grid}>
      {books.map((book, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.book_card, styles.shadow]}
          activeOpacity={0.7}
        >
          <BookItemImg book={book} />
          <BookItemContent book={book} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BookItemImg = ({ book }) => {
  return (
    <View style={{ position: "relative" }}>
      <Image
        source={book.img}
        style={styles.book_card_img}
        resizeMode="cover"
      />
      {!book.is_free && (
        <View style={[styles.circle_premium_small, styles.shadow]}>
          <AntDesign name="crown" size={18} color="black" />
        </View>
      )}
    </View>
  );
};

const BookItemContent = ({ book }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text
        style={styles.book_card_title}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {book.title}
      </Text>
      <Text style={styles.book_card_author} numberOfLines={1}>
        {book.author}
      </Text>

      {/* RATING & VIEWERS */}
      <View style={styles.book_card_footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="star" size={14} color={color_list.orange} />
          <Text style={styles.book_card_rating}>{book.rating}</Text>
        </View>

        {book.views && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="eye-outline" size={14} color="gray" />
            <Text style={styles.book_card_views}>{book.views}</Text>
          </View>
        )}
      </View>
      {/* END RATING & VIEWERS */}
    </View>
  );
};