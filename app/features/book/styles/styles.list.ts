import { StyleSheet, Platform } from 'react-native';
import { typography, colors } from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'row',
  },
  innerContainer: {
    flex: 1,
    minWidth: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  headerTitle: {
    ...typography.heading,
    color: colors.text.primary,
  },
  logoutButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
  },
  bookItem: {
    backgroundColor: colors.input.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
    width: '100%',
  },
  bookInfo: {
    gap: 4,
    width: '100%',
  },
  bookTitle: {
    ...typography.subheading,
    color: colors.text.primary,
  },
  bookAuthor: {
    ...typography.body,
    color: colors.text.secondary,
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookGenre: {
    ...typography.body,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    ...typography.button,
    color: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  errorText: {
    ...typography.error,
    color: colors.text.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    ...typography.button,
    color: colors.background,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    width: '100%',
  },
  searchInput: {
    ...typography.input,
    backgroundColor: colors.input.background,
    padding: 12,
    borderRadius: 8,
  },
});
