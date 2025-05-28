import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GENRE_LIST, getGenreIcon } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/styles.filters';

const GenreFilters = ({
  genreFilter,
  setGenreFilter,
}: {
  genreFilter: string;
  setGenreFilter: (genre: string) => void;
}) => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.leftGradient}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.container}
      >
        {GENRE_LIST.map(genre => (
          <TouchableOpacity
            key={genre}
            style={styles.genreButton}
            onPress={() => setGenreFilter(genreFilter === genre ? '' : genre)}
          >
            <Ionicons
              name={getGenreIcon(genre)}
              size={20}
              color={genreFilter === genre ? '#007AFF' : '#666'}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.rightGradient}
      />
    </View>
  );
};

export default GenreFilters;
