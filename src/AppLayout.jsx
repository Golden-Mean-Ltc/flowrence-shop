import { Outlet  } from 'react-router-dom'
import Header from './components/header/Header' 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-toastify/dist/ReactToastify.css' 
import "./styles/index.css"; 
import "./styles/modal.css";  
import "react-image-gallery/styles/image-gallery.css";
import Footer from './components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import CartModal from './components/cart/CartModal'
import AuthModal from './components/auth/AuthModal'
import { setShowAuthModal, setShowCartModal } from './store/settingsSlice' 

const AppLayout = () => {
  const dispatch = useDispatch()
    const {  showCartModal, showAuthModal } = useSelector((state) => state.settings);

  // const isLoading = navigation.state === 'loading'; 

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
        {/* <HorizontalList items={categories} /> */}
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
