import { AccessibilityRole, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

interface AuthButtonProps {
  onPress: () => void;
  disabled: boolean;
  text: string;
  secondary?: boolean;
  accessibilityLabel: string;
  accessibilityHint: string;
  accessibilityRole: AccessibilityRole;
}

const AuthButton = ({
  onPress,
  disabled,
  text,
  secondary,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
}: AuthButtonProps) => (
  <TouchableOpacity
    style={[
      secondary ? styles.secondaryButton : styles.button,
      disabled ? styles.buttonDisabled : undefined,
    ]}
    onPress={onPress}
    disabled={disabled}
    accessibilityLabel={accessibilityLabel}
    accessibilityHint={accessibilityHint}
    accessibilityRole={accessibilityRole}
  >
    <Text style={secondary ? styles.secondaryButtonText : styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default AuthButton;
