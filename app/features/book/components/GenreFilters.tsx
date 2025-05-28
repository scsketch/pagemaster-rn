import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles.filters';
import { Genre } from '../types';
import GenreButton from './GenreButton';

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

interface GenreFiltersProps {
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
}

export default function GenreFilters({ selectedGenre, onSelectGenre }: GenreFiltersProps) {
  return (
    <View style={styles.wrapper} accessibilityRole='none' importantForAccessibility='no'>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        accessibilityRole='none'
        importantForAccessibility='no'
      >
        <GenreButton
          genre={null}
          selectedGenre={selectedGenre}
          onSelectGenre={onSelectGenre}
          icon='apps'
        />
        {Object.entries(GENRE_ICONS).map(([genre, icon]) => (
          <GenreButton
            key={genre}
            genre={genre}
            selectedGenre={selectedGenre}
            onSelectGenre={onSelectGenre}
            icon={icon}
          />
        ))}
      </ScrollView>
    </View>
  );
}
