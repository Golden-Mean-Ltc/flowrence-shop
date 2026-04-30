import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// import Home from './ui/Home';
// import Error from './ui/Error';
// import Menu, { loader as menuLoader } from './features/menu/Menu';
// import Cart from './features/cart/Cart';
// import CreateOrder, {
//   action as createOrderAction,
// } from './features/order/CreateOrder';
// import Order, { loader as orderLoader } from './features/order/Order';
// import { action as updateOrderAction } from './features/order/UpdateOrder';
import HomeScreen from './components/home/HomeScreen'
import ProductScreen from './components/product/ProductScreen'
import AppLayout from './AppLayout'
import CartScreen from './components/cart/CartScreen'
import ShippingScreen from './components/ShippingScreen'
import PaymentScreen from './components/PaymentScreen'
import ProductsScreen from './components/products/ProductsScreen'
import PlaceOrderScreen from './components/PlaceOrderScreen'
import LoginScreen from './components/auth/LoginScreen'
import NotFound from './components/NotFound'
import ProfileScreen from './components/profile/ProfileScreen'
import PrivateRoute from './components/PrivateRoute'
import SettingsScreen from './components/profile/SettingsScreen'
import WishlistScreen from './components/profile/WishlistScreen'

const baseUrl = import.meta.env.BASE_URL || '/';

// console.log('Base URL:', baseUrl);  // Base URL: /bemart-v2-2026/

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement: <Error />,

    children: [
      {
        path:  '/',
        element: <HomeScreen />,
        index: true,
      },
      {
        path:  baseUrl,
        element: <HomeScreen />,
        index: true,
      },
      {
        path: 'products',
        element: <ProductsScreen />,
      },
      {
        path: 'products/page/:page',
        element: <ProductsScreen />,
      },
      //   {
      //     path: '/products/:category',
      //     element: <ProductsScreen />
      // //   },
      {
        path: 'search',
        // path: '/search/:keyword/page/:page',
        element: <ProductsScreen />,
      },
      {
        path: 'product/:productId',
        element: <ProductScreen />,
      },
      {
        path: 'cart',
        element: <CartScreen />,
      },
      {
        path: 'shipping',
        element: <ShippingScreen />,
      },
      {
        path: 'payment',
        element: <PaymentScreen />,
      },
      {
        path: 'placeorder',
        element: <PlaceOrderScreen />,
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      // # Protected routes group - Only logged in users can access
      {
        element: <PrivateRoute />, // The wrapper component
        children: [
          {
            path: 'profile',
            element: <ProfileScreen />,
          },
          // {
          //   path: "/dashboard",
          //   element: <Dashboard />,
          // },
          {
            // path: "/dashboard/settings",
            path: "/settings",
            element: <SettingsScreen />,
          },
          { 
            path: "/wishlist",
            element: <WishlistScreen />,
          },
        ],
      }, 
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
