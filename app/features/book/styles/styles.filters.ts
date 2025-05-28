import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
