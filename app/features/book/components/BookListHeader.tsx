import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GenreFilters from './GenreFilters';
import styles from '../styles/styles.header';

const BookListHeader = ({
  search,
  setSearch,
  genreFilter,
  setGenreFilter,
}: {
  search: string;
  setSearch: (search: string) => void;
  genreFilter: string;
  setGenreFilter: (genre: string) => void;
}) => {
  const { logout } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.searchContainer}>
          <Ionicons name='search' size={20} color='#666' style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder='Search books...'
            placeholderTextColor='#666'
            autoCapitalize='none'
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name='log-out-outline' size={24} color='#007AFF' />
        </TouchableOpacity>
      </View>
      <GenreFilters genreFilter={genreFilter} setGenreFilter={setGenreFilter} />
    </View>
  );
};

export default BookListHeader;
