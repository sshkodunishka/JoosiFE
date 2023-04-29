import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { User } from '@/stores/userStore';

type Props = {
  requiredRole?: string;
  user: User | undefined;
  children: any;
};

const ProtectedRoute = ({ user, children, requiredRole }: Props) => {
  if (!user) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  if (requiredRole && user.role !== requiredRole) {
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
