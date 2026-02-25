import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLoginMutation = () => {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (variables: any) => authApi.login(variables),
    onSuccess: (data: any) => {
      setAuth(data.login.user, data.login.token);
      navigate('/');
    },
  });
};

export const useRegisterMutation = () => {
  const { register: setAuth } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (variables: any) => authApi.register(variables),
    onSuccess: (data: any) => {
      setAuth(data.register.user, data.register.token);
      navigate('/');
    },
  });
};
