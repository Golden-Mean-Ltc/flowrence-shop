 
import { Outlet , useNavigation } from 'react-router-dom'
import Header from './components/header/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OffcanvasExample from './components/OffcanvasExample';

const AppLayout = () => {
    const navigation = useNavigation();
    // const isLoading = navigation.state === 'loading';

  return (
    <div 
    //className="grid h-screen grid-rows-[auto_1fr_auto]"
    >
    {/* {isLoading && <Loader />} */}
    <ToastContainer />
    {/* <Header /> */}
    <header>
      <OffcanvasExample />
      </header>
 
      <main className="mx-auto max-w-3xl">
        <Outlet />
      </main> 

    {/* <CartOverview /> */}
  </div>
  )
}

export default AppLayout