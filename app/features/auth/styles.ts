import { StyleSheet } from 'react-native';
import { typography, colors } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    minWidth: 300,
    maxWidth: 500,
  },
  title: {
    ...typography.title,
    marginTop: 60,
    marginBottom: 40,
    textAlign: 'center',
    color: colors.text.primary,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
    position: 'relative',
    marginBottom: 24,
  },
  label: {
    ...typography.label,
    color: colors.text.primary,
  },
  input: {
    ...typography.input,
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.input.background,
    color: colors.text.primary,
  },
  placeholderText: {
    color: '#999999',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50, // Make room for the eye icon
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.button.disabled,
    borderColor: colors.button.disabled,
  },
  buttonText: {
    ...typography.button,
    color: colors.background,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  inputError: {
    borderColor: colors.text.error,
    borderWidth: 1,
  },
  errorText: {
    ...typography.error,
    color: colors.text.error,
    position: 'absolute',
    bottom: -20,
    left: 0,
  },
  authErrorText: {
    ...typography.error,
    color: colors.text.error,
    textAlign: 'center',
  },
  errorContainer: {
    height: 20,
    justifyContent: 'center',
  },
});
