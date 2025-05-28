import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useBooks } from '../hooks';
import styles from '../styles/styles.list';
import { BookList, BookListHeader, GenreFilters } from '../components';

export default function BookListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    books,
    isLoading,
    isRefreshing,
    hasMore,
    fetchNextPage,
    refresh,
    search,
    setSearch,
    genreFilter,
    setGenreFilter,
  } = useBooks();

  const handleGenreSelect = (genre: string | null) => {
    setGenreFilter(genre || '');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <BookListHeader
          search={search}
          setSearch={setSearch}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <GenreFilters selectedGenre={genreFilter || null} onSelectGenre={handleGenreSelect} />
          <BookList
            books={books}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            hasMore={hasMore}
            fetchNextPage={fetchNextPage}
            refresh={refresh}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddBook', {})}
        >
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
