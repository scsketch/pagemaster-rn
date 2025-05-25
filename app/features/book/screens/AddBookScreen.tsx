import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { useBooks } from '../hooks/useBooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  author: z.string().min(1, 'Author is required').max(100, 'Author name is too long'),
  genre: z.string().min(1, 'Genre is required').max(50, 'Genre is too long'),
  price: z
    .string()
    .min(1, 'Price is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid price (e.g., 19.99)'),
});

type BookFormInput = z.input<typeof bookSchema>;

export default function AddBookScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { addBook } = useBooks();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormInput>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      price: '',
    },
  });

  const onSubmit: SubmitHandler<BookFormInput> = async data => {
    const priceNumber = parseFloat(data.price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert('Error', 'Price must be a number greater than 0');
      return;
    }
    try {
      await addBook({ ...data, price: priceNumber });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add book. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <Controller
              control={control}
              name='title'
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={[styles.input, errors.title && styles.inputError]}
                  placeholder='Enter book title'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isSubmitting}
                />
              )}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Author</Text>
            <Controller
              control={control}
              name='author'
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={[styles.input, errors.author && styles.inputError]}
                  placeholder='Enter author name'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isSubmitting}
                />
              )}
            />
            {errors.author && <Text style={styles.errorText}>{errors.author.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Genre</Text>
            <Controller
              control={control}
              name='genre'
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={[styles.input, errors.genre && styles.inputError]}
                  placeholder='Enter book genre'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isSubmitting}
                />
              )}
            />
            {errors.genre && <Text style={styles.errorText}>{errors.genre.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price</Text>
            <Controller
              control={control}
              name='price'
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={[styles.input, errors.price && styles.inputError]}
                  placeholder='Enter book price'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='decimal-pad'
                  editable={!isSubmitting}
                />
              )}
            />
            {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton, isSubmitting && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>{isSubmitting ? 'Adding...' : 'Add Book'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
    minHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
