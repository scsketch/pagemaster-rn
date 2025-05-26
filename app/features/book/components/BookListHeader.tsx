import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles.list';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBooks } from '../hooks';

const BookListHeader = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (text: string) => void;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search books...'
          value={search}
          onChangeText={setSearch}
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name='log-out-outline' size={24} color='#007AFF' />
      </TouchableOpacity>
    </View>
  );
};

export default BookListHeader;
