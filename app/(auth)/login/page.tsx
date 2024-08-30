import { Metadata } from 'next';
import LoginForm from '@/components/Forms/LoginForm';

export const metadata: Metadata = {
  title: 'Login | Planizky ',
};

const Login = () => <LoginForm />;

export default Login;
