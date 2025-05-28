import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import LoginForm from '../components/LoginForm';
import styles from '../styles';
import { useAuth } from '../hooks';
import ErrorBoundary from '../../../components/errorBoundary';

export default function LoginScreen() {
  const { login, signUp } = useAuth();

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Pagemaster Books</Text>
            <LoginForm login={login} signUp={signUp} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
}
