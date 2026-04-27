import React, { useState } from 'react';
import { TextInput, View, Button } from 'react-native';
import { styles } from '../styles/StyleApps';
const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Cari buku"
        style={styles.search_bar}
      />
      <Button title="Cari" onPress={handleSearch} />
    </View>
  );
};

export default SearchBar;