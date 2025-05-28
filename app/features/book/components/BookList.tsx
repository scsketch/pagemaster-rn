import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Platform } from 'react-native';
import styles from '../styles/styles.list';
import { Book } from '../types';
import BookListItem from './BookListItem';
import React from 'react';

const BookList = ({
  books,
  isLoading,
  isRefreshing,
  hasMore,
  fetchNextPage,
  refresh,
}: {
  books: Book[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  fetchNextPage: () => void;
  refresh: () => void;
}) => {
  const renderBookItem = ({ item }: { item: Book }) => <BookListItem book={item} />;

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size='small' color='#007AFF' />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        onEndReached={() => {
          if (!isLoading && !isRefreshing && hasMore) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={isRefreshing}
        onRefresh={refresh}
        maxToRenderPerBatch={10}
        windowSize={10}
        scrollEnabled={true}
        onScrollBeginDrag={() => {
          if (Platform.OS === 'web') {
            document.body.style.cursor = 'grabbing';
          }
        }}
        onScrollEndDrag={() => {
          if (Platform.OS === 'web') {
            document.body.style.cursor = 'grab';
          }
        }}
        onTouchStart={() => {
          if (Platform.OS === 'web') {
            document.body.style.cursor = 'grab';
          }
        }}
      />
    </View>
  );
};

export default BookList;
