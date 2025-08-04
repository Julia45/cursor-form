import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setUser, setLoading, setError, clearError } from '../../store/userSlice';
import { authAPI } from '../../services/api';
import { registrationSchema, loginSchema, RegistrationFormData, LoginFormData } from '../../utils/validation';
import { initializeGoogleAuth, signInWithGoogle } from '../../services/googleAuth';
import {
  AuthContainer,
  AuthCard,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  Button,
  Divider,
  ToggleText,
  LoadingSpinner,
} from './AuthForm.styles';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [googleAuthReady, setGoogleAuthReady] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    const initGoogle = async () => {
      try {
        await initializeGoogleAuth();
        setGoogleAuthReady(true);
      } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
      }
    };

    initGoogle();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(isLogin ? loginSchema : registrationSchema),
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
    dispatch(clearError());
  };

  const onSubmit = async (data: RegistrationFormData | LoginFormData) => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      let response;
      if (isLogin) {
        response = await authAPI.login(data as LoginFormData);
      } else {
        response = await authAPI.register(data as RegistrationFormData);
      }

      if (response.success && response.user) {
        dispatch(setUser({
          email: response.user.email,
          name: response.user.name,
        }));
      } else {
        dispatch(setError(response.message || 'Authentication failed'));
      }
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || 'Network error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleAuth = async () => {
    if (!googleAuthReady) {
      dispatch(setError('Google authentication is not ready'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const googleToken = await signInWithGoogle();
      const response = await authAPI.googleAuth(googleToken);

      if (response.success && response.user) {
        dispatch(setUser({
          email: response.user.email,
          name: response.user.name,
        }));
      } else {
        dispatch(setError(response.message || 'Google authentication failed'));
      }
    } catch (error: any) {
      dispatch(setError(error.message || 'Google authentication failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>{isLogin ? 'Welcome Back' : 'Create Account'}</Title>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <InputGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                hasError={!!errors.name}
                {...register('name')}
              />
              {errors.name && <ErrorMessage>{String(errors.name.message) || 'Invalid name'}</ErrorMessage>}
            </InputGroup>
          )}

          <InputGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              hasError={!!errors.email}
              {...register('email')}
            />
            {errors.email && <ErrorMessage>{String(errors.email.message) || 'Invalid email'}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              hasError={!!errors.password}
              {...register('password')}
            />
            {errors.password && <ErrorMessage>{String(errors.password.message) || 'Invalid password'}</ErrorMessage>}
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <Button variant="google" onClick={handleGoogleAuth} disabled={isLoading || !googleAuthReady}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleAuthReady ? 'Continue with Google' : 'Loading Google...'}
        </Button>

        <ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={toggleMode}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </ToggleText>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthForm;