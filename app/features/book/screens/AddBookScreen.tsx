import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBookMutations } from '../hooks/useBookMutations';
import { useBookDetail } from '../hooks/useBookDetail';
import { Genre } from '../types';
import { BackButtonX, Picker } from '../../../components';
import styles from '../styles/styles.add';
import ErrorBoundary from '../../../components/errorBoundary';

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
  const { id } = route.params as { id?: string };
  const { addBook, updateBook, addBookError, updateBookError } = useBookMutations();
  const { book } = useBookDetail(id ?? '');
  const isEditing = !!id;

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
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price?.toString() ?? '',
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
        description: data.description || '',
      };

      if (isEditing && id) {
        await updateBook({
          id,
          bookData,
        });
      } else {
        await addBook(bookData);
      }
      navigation.goBack();
    } catch (error) {
      // The error will now be handled by the error state from the mutation
    }
  };

  const renderSaveButton = () => (
    <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
      <Text style={styles.saveButtonText}>Save</Text>
    </TouchableOpacity>
  );

  const renderError = () => {
    const error = isEditing ? updateBookError : addBookError;
    if (!error) return null;

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : 'Failed to save book. Please try again.'}
        </Text>
      </View>
    );
  };

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <BackButtonX />
            <Text style={styles.headerTitle}>{isEditing ? 'Edit Book' : 'Add Book'}</Text>
            {Platform.OS !== 'web' && renderSaveButton()}
          </View>
          <ScrollView style={styles.content}>
            {renderError()}
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
                    placeholderTextColor='#999999'
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
                    placeholderTextColor='#999999'
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
                    placeholderTextColor='#999999'
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
                    placeholderTextColor='#999999'
                    multiline
                    numberOfLines={4}
                    autoCorrect={false}
                  />
                </View>
              )}
            />
            {Platform.OS === 'web' && renderSaveButton()}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ErrorBoundary>
  );
}
