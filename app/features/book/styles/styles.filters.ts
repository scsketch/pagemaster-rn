import { StyleSheet } from 'react-native';
import { typography, colors } from '../../../theme';

export default StyleSheet.create({
  wrapper: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: colors.border.light,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  genreButton: {
    width: 80,
    height: 48,
    borderRadius: 22,
    backgroundColor: colors.input.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
    marginHorizontal: 10,
    marginVertical: 6,
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
