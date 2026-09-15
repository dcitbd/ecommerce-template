import React from 'react';
import { ForgotPasswordModal } from '../../components/auth/ForgotPasswordModal';

export const ForgotPasswordPage: React.FC = () => {
  return <ForgotPasswordModal isOpen={true} onClose={() => window.history.back()} />;
};
