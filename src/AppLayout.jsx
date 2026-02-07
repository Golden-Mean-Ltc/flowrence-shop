import { Outlet  } from 'react-router-dom'
import Header from './components/header/Header'
// import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import SearchBar from './components/header/SearchBar'
import HorizontalList from './components/HorizontalList'
import Footer from './components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import CartModal from './components/cart/CartModal'
import AuthModal from './components/auth/AuthModal'
import { setShowAuthModal, setShowCartModal } from './store/settingsSlice'

const AppLayout = () => {
  const dispatch = useDispatch()
    const {  showCartModal, showAuthModal } = useSelector((state) => state.settings);

  // const isLoading = navigation.state === 'loading';
  const categoris = ['Books', 'Art supplies', 'Stationary', 'Electronis', 'Sports & Fitness', 'Toys & Games', 'Personal Care', 'Home & Kitchen']

    const handleShowCartModal = () => dispatch(setShowCartModal(!showCartModal))
    const handleShowAuthModal = () => dispatch(setShowAuthModal(!showAuthModal))

  return (
    <>
      <CartModal show={showCartModal} setShow={handleShowCartModal} />
      <AuthModal show={showAuthModal} setShow={handleShowAuthModal} />
      {/* {isLoading && <Loader />} */}
      {/* <ToastContainer /> */}
      <Header />
      <header>
        {/* <SearchBar /> */}
        <HorizontalList items={categoris} />
      </header>

      <main >
        <Outlet />
      </main>
      <Footer />
      {/* <CartOverview /> */}
    </>
  )
}

export default AppLayout
