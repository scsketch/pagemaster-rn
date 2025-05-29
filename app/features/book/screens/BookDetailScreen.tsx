import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useBookDetail } from '../hooks/useBookDetail';
import { useBookMutations } from '../hooks/useBookMutations';
import styles from '../styles/styles.detail';
import { BackButtonX } from '../../../components';
import ErrorBoundary from '../../../components/errorBoundary';

const BookDetail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const BookDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { book, isLoading, error } = useBookDetail(id);
  const { deleteBook } = useBookMutations();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButtonX />
        <View style={styles.errorContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !book) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButtonX />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Book not found'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = async () => {
    const confirmMessage = 'Are you sure you want to delete this book?';

    if (Platform.OS === 'web') {
      if (window.confirm(confirmMessage)) {
        try {
          await deleteBook(id);
          navigation.goBack();
        } catch (error) {
          // Error will be handled by the mutation
        }
      }
    } else {
      Alert.alert(
        'Delete Book',
        confirmMessage,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteBook(id);
                navigation.goBack();
              } catch (error) {
                // Error will be handled by the mutation
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const renderEditButton = () => (
    <TouchableOpacity
      style={styles.saveButton}
      onPress={() => navigation.navigate('AddBook', { id })}
    >
      <Text style={styles.saveButtonText}>Edit</Text>
    </TouchableOpacity>
  );

  const renderDeleteButton = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <BackButtonX />
          <View style={styles.headerButtons}>
            {Platform.OS !== 'web' && (
              <>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('AddBook', { id })}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={handleDelete}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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

          {Platform.OS === 'web' && (
            <View style={styles.buttonContainer}>
              {renderEditButton()}
              {renderDeleteButton()}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const BookDetailScreenWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <BookDetailScreen />
    </ErrorBoundary>
  );
};

export default BookDetailScreenWithErrorBoundary;
