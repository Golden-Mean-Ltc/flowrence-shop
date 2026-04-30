 import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message.jsx'
import Loader from '../Loader.jsx' 
import BillboardCarousel from './BillboardCarousel.jsx'
import ProductSlider from '../products/ProductSlider.jsx' 
import { setShowCartModal } from '../../store/settingsSlice.js' 
import HorizontalList from '../HorizontalList.jsx'
import { categories } from '../../constants/strings.js' 
// import ToastExample from '../ToastExample.jsx'
import { ToastContainer } from 'react-toastify' 
import ProductSlider2 from '../products/ProductSlider2.jsx'
 
const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const { language, showCartModal } = useSelector((state) => state.settings);
  const { loading, error
   // , products
   } = productList
  const { r } = useSelector((state) => state.strings)

  const handleShowCartModal = () => dispatch(setShowCartModal(!showCartModal))
  // const handleShowAuthModal = () => dispatch(setShowAuthModal(!showAuthModal))


  // useEffect(() => {
    // dispatch(listProducts()) 
    // console.log(pageNumber)
  // }, [dispatch])

  return (
    <div className='screen ' dir={language == "arb" ? 'rtl' : 'ltr'}> 
      <HorizontalList items={categories} language={language} /> 

       <ToastContainer
               position="top-left"
               autoClose={1500}
               hideProgressBar={false}
               newestOnTop={false}  
               theme="light" 
             />

      <div className='container mb-3' dir={language == "arb" ? 'rtl' : 'ltr'}>
        {/* <ResponsiveColumnsExample /> */}
        <div className="row mb-5 hide-on-small-screen">
          <div className="col p-0">
            <BillboardCarousel />
          </div>
        </div>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <>
       <div className="mb-3">
            {/* <ProductSlider
              title={r.featured_products}
              url="/products/bestsellers"
            /> */} 
             <ProductSlider2  
              title={r.featured_products}
              url="/products/bestsellers"  
              />
          </div>    
{/* 
          <div className="mb-4">
            <ProductSlider title={r.best_sellers} url="/products/bestsellers" />
          </div> */} 

       

          <div className='d-flex flex-wrap justify-content-between align-items-center border-bottom p-3'>
            <h4> {r.latest_products} </h4> 
             <div className='p-2'>
              <Link className='text-info' to='/products'>
                {r.show_more} <i className='fas fa-angle-right' />{' '}
              </Link>
            </div> 
          </div>
          {/* {!loading && (
           <ProductSlider url="/products/latest"   />
          )} */}
        </>
      </div>
      {cartItems.length > 0 && (
        <div className='fixed-element'>
          <div className='row'>
            <div className='col-sm-2 col-md-3 pt-2' >
              <h6 className="x" onClick={() => handleShowCartModal()}>
                <i className="fas fa-shopping-cart" /> items in cart :  {cartItems.length} </h6>
            </div>
            <div className='col px-4'>
              <Link to='/cart' className='btn btn-success rounded-pill btn-lg w-100'>
                {' '}
                {/* Submit order → */}
                تثبيت الطلب
              </Link>{' '}
            </div>
            <div className="col-sm-2 col-md-3"> </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomeScreen
