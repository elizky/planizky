import { Metadata } from 'next';
import RegisterForm from '@/components/Forms/RegisterForm';

export const metadata: Metadata = {
  title: 'Register | Planizky ',
};

const Register = () => <RegisterForm />;

export default Register;
