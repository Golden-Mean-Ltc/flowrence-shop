import { Outlet, useNavigation } from 'react-router-dom'
import Header from './components/header/Header'
// import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SearchBar from './components/header/SearchBar'
import HorizontalList from './components/HorizontalList'
import Footer from './components/footer/Footer'

const AppLayout = () => {
  // const navigation = useNavigation()
  // const isLoading = navigation.state === 'loading';
  const categoris = ['Books', 'Art supplies', 'Stationary', 'Electronis', 'Sports & Fitness', 'Toys & Games', 'Personal Care', 'Home & Kitchen']

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {/* <ToastContainer /> */}
      <Header />
      <header>
        {/* <SearchBar /> */}
        <HorizontalList items={categoris} />
      </header>

      <main  >
        <Outlet />
      </main>
      <Footer />
      {/* <CartOverview /> */}
    </>
  )
}

export default AppLayout
