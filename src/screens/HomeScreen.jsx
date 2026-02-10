import { useEffect  } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductItem from '../components/products/ProductItemCard.jsx'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAllProducts, listProducts } from '../store/actions/productActions'
import BillboardCarousel from '../components/home/BillboardCarousel.jsx'
import ProductsSlider from '../components/products/ProductSlider.jsx' 
import { setShowCartModal } from '../store/settingsSlice.js' 

// const HomeScreen = ({ match }) => {
const HomeScreen = () => {
  const dispatch = useDispatch()

  // const [showCartModal, setShowCartModal] = useState(false); 

  const productList = useSelector((state) => state.productList)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const { language, showCartModal } = useSelector((state) => state.settings);
  const { loading, error, products } = productList
  const { r } = useSelector((state) => state.strings)

  const handleShowCartModal = () => dispatch(setShowCartModal(!showCartModal))
  // const handleShowAuthModal = () => dispatch(setShowAuthModal(!showAuthModal))


  useEffect(() => {
    dispatch(listProducts()) 
    // console.log(pageNumber)
  }, [dispatch])

  return (
    <div className='container-fluid'> 
      <div className='container ' dir={language == "arb" ? 'rtl' : 'ltr'}>
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
            <ProductsSlider
              title={r.featured_products}
              url="/products/bestsellers"
            />
          </div>

          <div className="mb-4">
            <ProductsSlider title={r.best_sellers} url="/products/bestsellers" />
          </div>

          <div className='d-flex flex-wrap justify-content-between align-items-center border-bottom p-3'>
            <h4> {r.latest_products} </h4>

             <div className='p-2'>
              <Link className='text-info' to='/products'>
                {r.show_more} <i className='fas fa-angle-right' />{' '}
              </Link>
            </div> 
          </div>
          {!loading && (
            <Row className='bg-white mb-3'>
              {products.slice(0, 8).map((product) => (
                <Col
                  key={product.asin}
                  xm={12}
                  sm={6}
                  md={4}
                  lg={3} 
                className="p-0"
                >
                  <ProductItem product={product} 
                //  grid={false} 
                  clickable />
                </Col>
              ))}
            </Row>
          )}
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
              <Link href='/cart' className='btn btn-success rounded-pill btn-lg w-100'>
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
