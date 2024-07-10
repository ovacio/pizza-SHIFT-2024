import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import {
  Basket,
  CardPayment,
  InfoOrder,
  Layout,
  Login,
  MainPage,
  Orders,
  UserProfile,
} from '@/components/imports';
import { ROUTES } from '@/utils/routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={ROUTES.MAINPAGE} element={<MainPage />} />
      <Route path={ROUTES.LOGIN} element={<Login onClose={() => {}} />} />
      <Route path={ROUTES.PROFILE} element={<UserProfile />} />
      <Route path={ROUTES.BASKET} element={<Basket />} />
      <Route path={ROUTES.INFORMATIONORDER} element={<InfoOrder />} />
      <Route path={ROUTES.PAYMENTINFO} element={<CardPayment />} />
      <Route path={ROUTES.ORDERS} element={<Orders />} />
    </Route>,
  ),
);

export const Router = () => <RouterProvider router={router} />;
