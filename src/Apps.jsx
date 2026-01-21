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
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import AppLayout from './AppLayout'; 
import CartScreen from './pages/CartScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import ProductsScreen from './pages/ProductsScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';  


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
    //   },
      {
        path: '/search/:keyword',
        element: <ProductsScreen />
      },  
      {
        path: '/search/:keyword/page/:page',
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
    ],
  },
]);

function Apps() {
  return <RouterProvider router={router} />;
}

export default Apps 