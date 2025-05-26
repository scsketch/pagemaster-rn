import React, { useRef } from 'react';
import { Book } from '../types';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import styles from '../styles/styles.list';

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
        <Text>{count.current}</Text>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>{book.author}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default BookListItem;
