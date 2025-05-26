import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../auth/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBooks } from '../hooks/useBooks';
import { Book } from '../types';
import React, { useCallback, useRef } from 'react';
import BookListItem from '../components/BookListItem';
import styles from '../styles/styles.list';
import BookList from '../components/BookList';
import BookListHeader from '../components/BookListHeader';

export default function BookListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { books, isLoading, isRefreshing, hasMore, fetchNextPage, refresh, search, setSearch } =
    useBooks();

  return (
    <SafeAreaView style={styles.container}>
      <BookListHeader search={search} setSearch={setSearch} />
      <BookList
        books={books}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        hasMore={hasMore}
        fetchNextPage={fetchNextPage}
        refresh={refresh}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddBook', {})}>
        <Text style={styles.addButtonText}>Add Book</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
