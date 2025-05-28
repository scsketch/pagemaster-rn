import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { GenreIcon } from '../types';
import styles from '../styles/styles.filters';

const selectedColor = '#2196F3';
const unselectedColor = '#666';

interface GenreButtonProps {
  genre: string | null;
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
  icon: string;
}

const GenreButton = ({ genre, selectedGenre, onSelectGenre, icon }: GenreButtonProps) => (
  <TouchableOpacity
    key={genre}
    style={[styles.genreButton]}
    onPress={() => onSelectGenre(genre)}
    accessibilityLabel={genre ? `Filter genre ${genre}` : 'Show all genres'}
    accessibilityHint={'Press to filter books by genre. Press again to remove filter'}
    accessibilityRole='button'
  >
    <Ionicons
      name={icon as GenreIcon}
      size={24}
      color={selectedGenre === genre ? selectedColor : unselectedColor}
      focusable={false}
      pointerEvents='none'
      importantForAccessibility='no'
    />
  </TouchableOpacity>
);

export default GenreButton;
