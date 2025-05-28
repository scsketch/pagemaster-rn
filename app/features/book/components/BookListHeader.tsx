import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/styles.header';

interface BookListHeaderProps {
  search: string;
  setSearch: (search: string) => void;
  genreFilter: string;
  setGenreFilter: (genre: string) => void;
}

const BookListHeader = ({
  search,
  setSearch,
  genreFilter,
  setGenreFilter,
}: BookListHeaderProps) => {
  const { logout } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always go back
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
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
            placeholderTextColor='#999999'
            autoCapitalize='none'
            autoCorrect={false}
            accessibilityLabel='Search books by title or author'
            accessibilityHint='Enter text to search for books by title or author'
            accessibilityRole='search'
          />
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityLabel='Logout button'
          accessibilityHint='Press to logout and return to the login screen'
          accessibilityRole='button'
        >
          <Ionicons name='log-out-outline' size={24} color='#007AFF' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookListHeader;
