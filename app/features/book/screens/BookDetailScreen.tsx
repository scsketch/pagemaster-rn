import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { useBooks } from '../hooks';
import styles from '../styles/styles.detail';
import { BackButtonX } from '../../../components';

const BookDetail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

export default function BookDetailScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { bookId } = route.params as { bookId: string };
  const { books, fetchBook } = useBooks();
  const book = books.find(b => b.bookId === bookId);

  useEffect(() => {
    fetchBook(bookId);
  }, []);

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButtonX />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Book not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButtonX />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('AddBook', { bookId })}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <View style={styles.detailsContainer}>
          <BookDetail label='Author' value={book.author} />
          <BookDetail label='Genre' value={book.genre} />
          <BookDetail label='Price' value={`$${book.price.toFixed(2)}`} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.descriptionText}>{book.description ?? 'None'}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
