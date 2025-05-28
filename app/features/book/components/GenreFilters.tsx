import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GENRE_LIST, getGenreIcon } from '../types';
import styles from '../styles/styles.filters';

const GenreFilters = ({
  genreFilter,
  setGenreFilter,
}: {
  genreFilter: string;
  setGenreFilter: (genre: string) => void;
}) => {
  // Split genres into two rows
  const midPoint = Math.ceil(GENRE_LIST.length / 2);
  const firstRow = GENRE_LIST.slice(0, midPoint);
  const secondRow = GENRE_LIST.slice(midPoint);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {firstRow.map(genre => (
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
      </View>
      <View style={styles.row}>
        {secondRow.map(genre => (
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
      </View>
    </View>
  );
};

export default GenreFilters;
