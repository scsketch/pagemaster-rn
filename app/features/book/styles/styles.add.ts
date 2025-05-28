import { StyleSheet, Platform } from 'react-native';
import { typography, colors } from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    ...typography.heading,
    color: colors.text.primary,
  },
  headerRight: {
    width: 40, // To maintain header balance
  },
  content: {
    padding: 16,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  input: {
    ...typography.input,
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.input.background,
    width: '100%',
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  errorText: {
    ...typography.error,
    color: colors.text.error,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: Platform.OS === 'web' ? colors.primary : 'transparent',
    padding: Platform.OS === 'web' ? 16 : 8,
    borderRadius: Platform.OS === 'web' ? 8 : 0,
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? 8 : 0,
  },
  saveButtonText: {
    ...typography.button,
    color: Platform.OS === 'web' ? colors.background : colors.primary,
  },
});
