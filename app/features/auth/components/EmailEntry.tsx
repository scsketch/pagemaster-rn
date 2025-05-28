import { TextInput } from 'react-native';
import { LoginFormInput } from './LoginForm';
import { FieldErrors } from 'react-hook-form';
import styles from '../styles';

interface EmailEntryProps {
  value: string;
  onChange: (text: string) => void;
  errors: FieldErrors<LoginFormInput>;
  editable: boolean;
}

const EmailEntry = ({ value, onChange, errors, editable }: EmailEntryProps) => (
  <TextInput
    style={[styles.input, errors.email && styles.inputError]}
    placeholder='Enter your email'
    value={value}
    onChangeText={onChange}
    keyboardType='email-address'
    autoCapitalize='none'
    autoCorrect={false}
    autoComplete='email'
    editable={editable}
    accessibilityLabel='Email address'
    accessibilityHint='Enter your email address'
    accessibilityRole='text'
  />
);

export default EmailEntry;
