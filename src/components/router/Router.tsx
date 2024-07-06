import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  MainPage,
  Login,
  UserProfile,
  Basket,
  InfoOrder,
  CardPayment,
  Layout,
} from '@/components/imports';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login onClose={() => {}} />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/information_order" element={<InfoOrder />} />
      <Route path="/payment_info" element={<CardPayment />} />
    </Route>,
  ),
);

export const Router = () => <RouterProvider router={router} />;
