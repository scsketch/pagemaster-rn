import { FieldErrors } from 'react-hook-form';
import { LoginFormInput } from './LoginForm';
import { TextInput } from 'react-native';
import styles from '../styles';

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  errors: FieldErrors<LoginFormInput>;
  showPassword: boolean;
  editable: boolean;
}

const PasswordInput = ({ value, onChange, errors, showPassword, editable }: PasswordInputProps) => (
  <TextInput
    style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
    placeholder='Enter your password'
    placeholderTextColor={styles.placeholderText.color}
    value={value}
    onChangeText={onChange}
    secureTextEntry={!showPassword}
    autoCapitalize='none'
    autoComplete='password'
    editable={editable}
    accessibilityLabel='Password'
    accessibilityHint='Enter your password'
    accessibilityRole='text'
  />
);

export default PasswordInput;
