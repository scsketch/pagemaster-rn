import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    minWidth: 300,
    maxWidth: 500,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 40,
    textAlign: 'center',
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
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#007AFF',
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
    borderColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#ff3b30',
    borderWidth: 1,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    position: 'absolute',
    bottom: -20,
    left: 0,
  },
  authErrorText: {
    color: '#ff3b30',
    fontSize: 14,
    textAlign: 'center',
  },
  errorContainer: {
    height: 20,
    justifyContent: 'center',
  },
});
