import { Outlet, useNavigation } from 'react-router-dom'
import Header from './components/header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OffcanvasExample from './components/OffcanvasExample'
import SearchBar from './components/header/SearchBar'
import HorizontalList from './components/HorizontalList'

const AppLayout = () => {
  const navigation = useNavigation()
  // const isLoading = navigation.state === 'loading';
  const categoris = ['Books', 'Art supplies', 'Stationary', 'Electronis' , 'Sports & Fitness', 'Toys & Games' , 'Personal Care' , 'Home & Kitchen'] 

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {/* <ToastContainer /> */}
      {/* <Header /> */}
      <header> 
    <OffcanvasExample />
        <SearchBar />
        <HorizontalList items={categoris} /> 
      </header>

      <main className='mx-auto  '>
        <Outlet />
      </main>

      {/* <CartOverview /> */}
    </>
  )
}

export default AppLayout
