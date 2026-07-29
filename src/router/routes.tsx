import type { RouteObject } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import Product from '@/pages/Product';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product', element: <Product /> },
    ],
  },
];
