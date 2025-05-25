import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../features/auth/screens/LoginScreen';
import BookListScreen from '../features/book/screens/BookListScreen';
import BookDetailScreen from '../features/book/screens/BookDetailScreen';
import AddBookScreen from '../features/book/screens/AddBookScreen';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  BookList: undefined;
  BookDetail: { bookId: string };
  AddBook: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='BookList' component={BookListScreen} />
        <Stack.Screen name='BookDetail' component={BookDetailScreen} />
        <Stack.Screen name='AddBook' component={AddBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
