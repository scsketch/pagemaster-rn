import { render } from '@testing-library/react-native';
import BookListItem from '../BookListItem';
import { NavigationContainer } from '@react-navigation/native';

test('basic test', () => {
  const { getByText } = render(
    <NavigationContainer>
      <BookListItem book={{ id: '1', title: 'Test Book', author: 'Test Author', price: 100 }} />
    </NavigationContainer>
  );
  expect(getByText('Test Book')).toBeOnTheScreen();
  expect(getByText('Test Author')).toBeOnTheScreen();
});
