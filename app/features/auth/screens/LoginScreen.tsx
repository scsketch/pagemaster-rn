import { View, Text } from 'react-native';
import LoginForm from '../components/LoginForm';
import styles from '../styles';
import { useAuth } from '../hooks';

export default function LoginScreen() {
  const { login, signUp } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagemaster Books</Text>
      <LoginForm login={login} signUp={signUp} />
    </View>
  );
}
