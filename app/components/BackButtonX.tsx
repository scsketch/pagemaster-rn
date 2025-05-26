import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

const BackButtonX = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name='close' size={24} color='#333' />
    </TouchableOpacity>
  );
};

export default BackButtonX;

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
});
