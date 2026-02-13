import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// import Home from './ui/Home';
// import Error from './ui/Error';
// import Menu, { loader as menuLoader } from './features/menu/Menu';
// import Cart from './features/cart/Cart';
// import CreateOrder, {
//   action as createOrderAction,
// } from './features/order/CreateOrder';
// import Order, { loader as orderLoader } from './features/order/Order';
// import { action as updateOrderAction } from './features/order/UpdateOrder';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import AppLayout from './AppLayout'; 
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProductsScreen from './screens/ProductsScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';  
import LoginScreen from './screens/LoginScreen';  


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <HomeScreen />,
      },   
      {
        path: '/products',
        element: <ProductsScreen />
      },
      {
        path: '/products/page/:page',
        element: <ProductsScreen />
      },
    //   {
    //     path: '/products/:category',
    //     element: <ProductsScreen />
    // //   },
      {
        path: '/search',
        element: <ProductsScreen />
      },  
      { 
        // path: '/search/:keyword/page/:page',
        element: <ProductsScreen />
      },  
      {
        path: '/product/:productId',
        element: <ProductScreen />
      }, 
      {
        path: '/cart',
        element: <CartScreen />
      },
      {
        path: '/shipping',
        element: <ShippingScreen />
      },
      {
        path: '/payment',
        element: <PaymentScreen />
      },
      {
        path: '/placeorder',
        element: <PlaceOrderScreen />
      },
      {
        path: '/login',
        element: <LoginScreen />
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
