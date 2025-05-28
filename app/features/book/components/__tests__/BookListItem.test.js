import { render, act, screen, waitFor } from '@testing-library/react-native';
import BookListItem from '../BookListItem';
import { NavigationContainer } from '@react-navigation/native';

test('basic test', async () => {
  render(
    <NavigationContainer>
      <BookListItem book={{ id: '1', title: 'Test Book', author: 'Test Author', price: 100 }} />
    </NavigationContainer>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Book')).toBeOnTheScreen();
    expect(screen.getByText('Test Author')).toBeOnTheScreen();
  });
});
