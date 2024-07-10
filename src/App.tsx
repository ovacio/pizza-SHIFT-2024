import './index.css';
import { Router } from '@/components/imports';
import { AuthProvider, CartProvider } from '@/components/imports';

import '@/styles/reset.scss';

export const App = () => (
  <AuthProvider>
    <CartProvider>
      <Router />
    </CartProvider>
  </AuthProvider>
);
