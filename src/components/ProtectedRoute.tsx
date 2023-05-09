import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store';

type Props = {
  requiredRole?: string;
  children: any;
};

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const { userStore } = useStore();
  const user = userStore.currentUser;
  if (!user) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }
  if (requiredRole && user.Roles.role !== requiredRole) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
