import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  innerContainer: {
    width: '100%',
    minWidth: 300,
    maxWidth: 500,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
    width: '100%',
    flexGrow: 1,
  },
  bookItem: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    width: '100%',
  },
  bookInfo: {
    gap: 4,
    width: '100%',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  authorGenreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookGenre: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  errorText: {
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
