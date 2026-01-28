import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import ProductItem from '../components/products/ProductItemCard.jsx'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../store/actions/productActions'
import BillboardCarousel from '../components/home/BillboardCarousel.jsx'
import ProductsSlider from '../components/products/ProductSlider.jsx'
import ResponsiveColumnsExample from '../components/ResponsiveColumnsExample.jsx'

// const HomeScreen = ({ match }) => {
const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const cartItems = useSelector((state) => state.cart.cartItems)
   const language = useSelector((state) => state.settings.language);
  const { loading, error, products } = productList
  const { r } = useSelector((state) => state.strings)

  useEffect(() => {
    dispatch(listProducts())
    // console.log(pageNumber)
  }, [dispatch])

  return (
    <>
      <div className='container home-page' dir={language == "arb" ? 'rtl' : 'ltr'}>

        {/* <ResponsiveColumnsExample /> */}
        {/* <div className="row mb-5">
        <div className="col p-0">
          <BillboardCarousel />
        </div>
      </div> */}

        {/* <h2>{!keyword ? 'Latest Products' : 'Search Result'}</h2> */}
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <>
          {/* <div className="mb-3">
          <ProductsSlider
            title={r.featured_products}
            url="/products/bestsellers"
          />
        </div> */}

          {/* <div className="mb-4">
          <ProductsSlider title={r.best_sellers} url="/products/bestsellers" />
        </div> */}

          <div className='d-flex flex-wrap justify-content-between align-items-center border-bottom mb-3 px-3'>
            <h4> {r.latest_products} </h4>

            <div className='p-2'>
              <Link className='text-secondary' to='/products'>
                {r.show_more} <i className='fas fa-angle-right' />{' '}
              </Link>
            </div>
          </div>
          {!loading && (
            <Row className='bg-white'>
              {products.slice(0, 8).map((product) => (
                <Col
                  key={product.asin}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                // className="mb-2"
                >
                  <ProductItem product={product} grid={false} clickable />
                </Col>
              ))}
            </Row>
          )}
        </>
      </div>
      {cartItems.length > 0 && (
        <div className='fixed-element'>
          <div className='row'>
            <div className='col'>{cartItems.length} items in cart</div>
            <div className='col px-4'>
              <a href='/cart' className='btn btn-success rounded-pill btn-lg w-100'>
                {' '}
                Submit order →
              </a>{' '}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HomeScreen
