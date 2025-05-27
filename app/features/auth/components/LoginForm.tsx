import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import styles from '../styles';
import { NavigationProp, useNavigation, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React from 'react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInput = z.infer<typeof loginSchema>;

const LoginForm = ({
  login,
  signUp,
}: {
  login: (data: LoginFormInput) => Promise<void>;
  signUp: (data: LoginFormInput) => Promise<void>;
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormInput) => {
    setIsLoading(true);
    try {
      await login(data);
      navigation.navigate('BookList');
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again');
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: LoginFormInput) => {
    setIsLoading(true);
    try {
      await signUp(data);
      navigation.navigate('BookList');
    } catch (error) {
      Alert.alert('Sign Up Failed', 'Please check your credentials and try again');
      setIsLoading(false);
    }
  };

  // Reset loading state when screen loses focus
  React.useEffect(() => {
    if (!isFocused) {
      setIsLoading(false);
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
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder='Enter your email'
                value={value}
                onChangeText={onChange}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete='email'
                editable={!isLoading}
              />
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
                <TextInput
                  style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                  placeholder='Enter your password'
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  autoCapitalize='none'
                  autoComplete='password'
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color='#666' />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </>
          )}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, (isLoading || !isFocused) && styles.buttonDisabled]}
        onPress={handleSubmit(handleLogin)}
        disabled={isLoading || !isFocused}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButton, (isLoading || !isFocused) && styles.buttonDisabled]}
        onPress={handleSubmit(handleSignUp)}
        disabled={isLoading || !isFocused}
      >
        <Text style={styles.secondaryButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
