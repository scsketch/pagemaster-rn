import React, { useRef } from 'react';
import { Book, GenreIcon, getGenreIcon } from '../types';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import styles from '../styles/styles.list';
import { Ionicons } from '@expo/vector-icons';

const iconMap: Record<string, GenreIcon> = {
  Adventure: 'compass',
  Biography: 'person',
  Fantasy: 'sparkles',
  Fiction: 'book',
  Historical: 'time',
  Horror: 'skull',
  Mystery: 'search',
  Romance: 'heart',
  'Non-Fiction': 'book',
  'Sci-Fi': 'rocket',
};

const BookListItem = React.memo(({ book }: { book: Book }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const count = useRef(0);
  count.current++;
  return (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate('BookDetail', { bookId: book.bookId })}
    >
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <View style={styles.authorGenreRow}>
          <Text style={styles.bookAuthor}>{book.author}</Text>
          <View style={styles.genreContainer}>
            <Text style={styles.bookGenre}>{book.genre}</Text>
            <Ionicons name={getGenreIcon(book.genre)} size={16} color='#666' />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});
export default BookListItem;
