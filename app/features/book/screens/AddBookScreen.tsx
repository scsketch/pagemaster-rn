import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useBooks } from '../hooks/useBooks';
import { useEffect } from 'react';
import { Book, Genre } from '../types';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BackButtonX from '../../../components/BackButtonX';
import Picker from '../../../components/Picker';

const GENRE_OPTIONS = [
  'Adventure',
  'Biography',
  'Fantasy',
  'Fiction',
  'Historical',
  'Horror',
  'Mystery',
  'Non-Fiction',
  'Sci-Fi',
] as const;

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1, 'Genre is required'),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, 'Price must be greater than 0'),
  description: z.string().optional(),
});

type BookFormInput = z.infer<typeof bookSchema>;

export default function AddBookScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { bookId } = route.params as { bookId?: string };
  const { books, fetchBook, addBook, updateBook } = useBooks();
  const book = bookId ? books.find(b => b.bookId === bookId) : undefined;
  const isEditing = !!bookId;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInput>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title ?? '',
      author: book?.author ?? '',
      genre: book?.genre ?? '',
      price: book?.price?.toString() ?? '',
      description: book?.description ?? '',
    },
  });

  useEffect(() => {
    if (bookId) {
      fetchBook(bookId);
    }
  }, [bookId]);

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price.toString(),
        description: book.description,
      });
    }
  }, [book]);

  const onSubmit = async (data: BookFormInput) => {
    try {
      const bookData = {
        title: data.title,
        author: data.author,
        genre: data.genre as Genre,
        price: parseFloat(data.price),
        description: data.description,
      };

      if (isEditing && bookId) {
        await updateBook({
          bookId,
          bookData,
        });
      } else {
        await addBook(bookData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save book. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButtonX />
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Book' : 'Add Book'}</Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>{isEditing ? 'Save' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Controller
          control={control}
          name='title'
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder='Title'
                autoCorrect={false}
              />
              {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name='author'
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder='Author'
                autoCorrect={false}
              />
              {errors.author && <Text style={styles.errorText}>{errors.author.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name='genre'
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Picker
                value={value}
                onValueChange={onChange}
                items={GENRE_OPTIONS}
                placeholder='Select a genre'
              />
              {errors.genre && <Text style={styles.errorText}>{errors.genre.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name='price'
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder='Price'
                keyboardType='decimal-pad'
                autoCorrect={false}
              />
              {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                value={value}
                onChangeText={onChange}
                placeholder='Description'
                multiline
                numberOfLines={4}
                autoCorrect={false}
              />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    padding: 8,
  },
  submitButton: {
    padding: 8,
  },
  submitButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
  },
});
