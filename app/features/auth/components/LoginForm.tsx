import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import styles from '../styles';
import { NavigationProp, useNavigation, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React from 'react';
import PasswordInput from './PasswordInput';
import EyeButton from './EyeButton';
import AuthButton from './AuthButton';
import EmailEntry from './EmailEntry';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormInput = z.infer<typeof loginSchema>;

interface LoginFormProps {
  login: (data: LoginFormInput) => Promise<void>;
  signUp: (data: LoginFormInput) => Promise<void>;
}

const LoginForm = ({ login, signUp }: LoginFormProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'test@pagemaster.com',
      password: 'password',
    },
  });

  const handleLogin = async (data: LoginFormInput) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      await login(data);
      navigation.navigate('BookList');
    } catch (error) {
      setErrorMessage('Please check your credentials and try again');
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: LoginFormInput) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      await signUp(data);
      navigation.navigate('BookList');
    } catch (error) {
      setErrorMessage('Could not sign up with that email.');
      setIsLoading(false);
    }
  };

  // Reset loading state when screen loses focus
  React.useEffect(() => {
    if (!isFocused) {
      setIsLoading(false);
      setErrorMessage('');
    }
  }, [isFocused]);

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <>
              <EmailEntry onChange={onChange} value={value} errors={errors} editable={!isLoading} />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <>
              <View style={styles.passwordContainer}>
                <PasswordInput
                  value={value}
                  onChange={onChange}
                  errors={errors}
                  showPassword={showPassword}
                  editable={!isLoading}
                />
                <EyeButton show={showPassword} setShow={setShowPassword} disabled={isLoading} />
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </>
          )}
        />
      </View>
      <View style={styles.errorContainer}>
        {errorMessage ? <Text style={styles.authErrorText}>{errorMessage}</Text> : null}
      </View>
      <AuthButton
        onPress={handleSubmit(handleLogin)}
        disabled={isLoading || !isFocused}
        text='Login'
        accessibilityLabel='Log in'
        accessibilityHint='Press to log in to an existing account'
        accessibilityRole='button'
      />
      <AuthButton
        onPress={handleSubmit(handleSignUp)}
        disabled={isLoading || !isFocused}
        text='Sign Up'
        accessibilityLabel='Sign up'
        accessibilityHint='Press to sign up for a new account'
        accessibilityRole='button'
        secondary
      />
    </View>
  );
};

export default LoginForm;
