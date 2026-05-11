import { Link } from 'react-router-dom'
import {   useSelector } from 'react-redux'
import Message from '../Message.jsx'
import Loader from '../Loader.jsx'
import BillboardCarousel from './BillboardCarousel.jsx' 
import HorizontalList from '../HorizontalList.jsx'
import { categories } from '../../constants/strings.jsx'
import { ToastContainer } from 'react-toastify'
import ProductSlider2 from '../products/ProductSlider2.jsx' 

const HomeScreen = () => { 

  const productList = useSelector((state) => state.productList) 
  const { language } = useSelector((state) => state.settings)
  const {
    loading,
    error,
    // , products
  } = productList
  const { r } = useSelector((state) => state.strings)

  // const handleShowAuthModal = () => dispatch(setShowAuthModal(!showAuthModal))

  // useEffect(() => {
  // dispatch(listProducts())
  // console.log(pageNumber)
  // }, [dispatch])

  return (
    <div className='screen ' dir={language == 'arb' ? 'rtl' : 'ltr'}>
      <HorizontalList items={categories} language={language} />

      <ToastContainer
        position='top-left'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        theme='light'
      />

      <div className='container mb-3' dir={language == 'arb' ? 'rtl' : 'ltr'}>
        {/* <ResponsiveColumnsExample /> */}
        <div className='row mb-5 hide-on-small-screen'>
          <div className='col p-0'>
            <BillboardCarousel />
          </div>
        </div>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <>
          <div className='container mb-3'>
            <ProductSlider2
              title={r.recently_arrived}
              url='/products/bestsellers'
            />

            <ProductSlider2
              title={r.best_sellers}
              url='/products/bestsellers'
            />
          </div>

          <div className='d-flex flex-wrap justify-content-between align-items-center border-bottom p-3'>
            <h4> {r.latest_products} </h4>
            <div className='p-2'>
              <Link className='text-info' to='/products'>
                {r.show_more} <i className='fas fa-angle-right' />{' '}
              </Link>
            </div>
          </div>
          {!loading && <ProductSlider2 url='/products/latest' />}
        </>
      </div>
    </div>
  )
}

export default HomeScreen
