import React from 'react';

export const ProfileEditModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <div>Edit Profile Modal</div>;
};
