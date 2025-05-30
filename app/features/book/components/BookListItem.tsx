import React, { useRef } from 'react';
import { Book, getGenreIcon } from '../types';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import styles from '../styles/styles.list';

const BookListItem = React.memo(({ book }: { book: Book }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate('BookDetail', { id: book.id })}
    >
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>{book.author}</Text>
        <View style={styles.genreContainer}>
          <Text style={styles.bookGenre}>{book.genre}</Text>
          <Ionicons name={getGenreIcon(book.genre)} size={16} color='#666' />
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default BookListItem;
