import { Outlet } from 'react-router-dom';
import { Header } from '@/components/imports';

export const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);
