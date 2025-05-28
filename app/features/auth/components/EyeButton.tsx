import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import styles from '../styles';

interface EyeButtonProps {
  show: boolean;
  setShow: (show: boolean) => void;
  disabled: boolean;
}

const EyeButton = ({ show, setShow, disabled }: EyeButtonProps) => (
  <TouchableOpacity
    style={styles.eyeButton}
    onPress={() => setShow(!show)}
    disabled={disabled}
    accessibilityLabel='Toggle password visibility'
    accessibilityHint='Press to toggle password visibility'
    accessibilityRole='button'
  >
    <Ionicons
      name={show ? 'eye' : 'eye-off'}
      size={24}
      color='#666'
      pointerEvents='none'
      importantForAccessibility='no'
    />
  </TouchableOpacity>
);

export default EyeButton;
