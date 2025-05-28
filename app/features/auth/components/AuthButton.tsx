import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

interface AuthButtonProps {
  onPress: () => void;
  disabled: boolean;
  text: string;
  secondary?: boolean;
}

const AuthButton = ({ onPress, disabled, text, secondary }: AuthButtonProps) => (
  <TouchableOpacity
    style={[
      secondary ? styles.secondaryButton : styles.button,
      disabled ? styles.buttonDisabled : undefined,
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={secondary ? styles.secondaryButtonText : styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default AuthButton;
