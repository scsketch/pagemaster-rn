import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles.filters';
import { Genre } from '../types';

interface GenreFiltersProps {
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
}

const GENRE_ICONS: Record<Genre, string> = {
  Adventure: 'compass',
  Biography: 'person',
  Fantasy: 'sparkles',
  Fiction: 'book',
  Historical: 'time',
  Horror: 'skull',
  Mystery: 'search-circle',
  'Non-Fiction': 'book',
  Romance: 'heart',
  'Sci-Fi': 'rocket',
};

export default function GenreFilters({ selectedGenre, onSelectGenre }: GenreFiltersProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.genreButton,
            selectedGenre === null && { backgroundColor: '#E3F2FD', borderColor: '#2196F3' },
          ]}
          onPress={() => onSelectGenre(null)}
        >
          <Ionicons name='apps' size={24} color={selectedGenre === null ? '#2196F3' : '#666'} />
        </TouchableOpacity>
        {Object.entries(GENRE_ICONS).map(([genre, icon]) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreButton,
              selectedGenre === genre && { backgroundColor: '#E3F2FD', borderColor: '#2196F3' },
            ]}
            onPress={() => onSelectGenre(genre)}
          >
            <Ionicons
              name={icon as any}
              size={24}
              color={selectedGenre === genre ? '#2196F3' : '#666'}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
