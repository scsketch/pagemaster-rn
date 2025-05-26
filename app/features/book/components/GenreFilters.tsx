import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GENRE_LIST, getGenreIcon } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

const GenreFilters = () => {
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
        <TouchableOpacity style={styles.genreButton}>
          <Ionicons name='apps' size={20} color='#666' />
        </TouchableOpacity>
        {GENRE_LIST.map(genre => (
          <TouchableOpacity key={genre} style={styles.genreButton}>
            <Ionicons name={getGenreIcon(genre)} size={20} color='#666' />
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

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 12,
  },
  genreButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  leftGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 30,
    zIndex: 1,
  },
  rightGradient: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 30,
    zIndex: 1,
  },
});

export default GenreFilters;
