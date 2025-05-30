import { Platform, StyleSheet } from 'react-native';
import { typography, colors } from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
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
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  content: {
    padding: 20,
  },
  title: {
    ...typography.heading,
    color: colors.text.primary,
    marginBottom: 24,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  detailLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  detailValue: {
    ...typography.body,
    fontFamily: typography.label.fontFamily,
    color: colors.text.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    ...typography.error,
    color: colors.text.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    ...typography.button,
    color: colors.background,
  },
  descriptionContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  descriptionText: {
    ...typography.body,
    color: colors.text.primary,
    marginTop: 8,
    lineHeight: 24,
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: Platform.OS === 'web' ? colors.primary : 'transparent',
    padding: Platform.OS === 'web' ? 16 : 8,
    borderRadius: Platform.OS === 'web' ? 8 : 0,
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? 24 : 0,
    width: '100%',
  },
  saveButtonText: {
    ...typography.button,
    color: Platform.OS === 'web' ? colors.background : colors.primary,
  },
  deleteButton: {
    backgroundColor: Platform.OS === 'web' ? colors.text.error : 'transparent',
    padding: Platform.OS === 'web' ? 16 : 8,
    borderRadius: Platform.OS === 'web' ? 8 : 0,
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? 8 : 0,
    width: '100%',
  },
  deleteButtonText: {
    ...typography.button,
    color: Platform.OS === 'web' ? colors.background : '#EF4444',
  },
  buttonContainer: {
    gap: 8,
    marginTop: 24,
  },
});
