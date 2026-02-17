import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../Rating'
import { getProduct } from '../../utils'
import { useSelector, useDispatch } from 'react-redux'
// import AddToCartBtn from './AddToCartBtn'
import { addToCart } from '../../store/cart/cartSlice'

const ProductItemCard = ({
  product: product_,
  grid = true,
  // showRating,
}) => {
  const dispatch = useDispatch()
  const product = getProduct(product_)
  const { currency } = useSelector((state) => state.settings)
  const r = useSelector((state) => state.strings.r)

  // handle show cart plus icon btn
  // const [showCartPlus, setShowCartPlus] = useState(true)
  const [showCheck, setShowCheck] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  const handleAddToCartClick = () => {
    setShowSpinner(true)
    dispatch(addToCart(product.asin)).then(() => { 
        setShowCheck(true)
        setShowSpinner(false)
        setTimeout(() => setShowCheck(false), 900) 
    })
  }

  const getProductPrice = (priceInDollar, selectedCurrency) => {
    switch (selectedCurrency) {
      case 'usd':
        return priceInDollar
      case 'iqd':
        return priceInDollar * 1350
      // case 'eur':
      //   return (priceInDollar * 0.95).toFixed(2)
      default:
        return ''
    }
  }

  const getCurrencySign = (cur) => {
    switch (cur) {
      case 'usd':
        return <span>$ </span>
      case 'iqd':
        return <span>د.ع. </span>
      case 'eur':
        return <span>&euro; </span>
      default:
        return ''
    }
  }

  return (
    <Card className='product-item-card'>
      {/* <Card.Img src={product.image} variant='top' /> */}
      {/* <span>{grid ? 'Grid' : 'List'}</span> */}
      {/* <span className='badge badge-danger'>New</span> */}

      <div className='row'>
        <div className={grid ? 'col-12' : 'col-6'}>
          <div className='card-img'>
            <Link to={`/product/${product._id}`}>
              <img
                src={
                  product.mainImage !== undefined
                    ? product.mainImage.imageUrl
                    : 'product.imageUrlList[0]'
                }
                alt=''
              />
            </Link>
          </div>
        </div>
        <div className='col'>
          <div className={`card-body ${grid ? '' : 'pt-3'}`}>
            <Link to={`/product/${product._id}`} className='product-title'>
              <div className='card-title' style={{ minHeight: '48px' }}>
                <strong>{product.name}</strong>
              </div>
            </Link>

            <div className='card-text'>
              <Rating
                rating={product.rating} //  4.7
                // number of reviews
                text={`${product.numReviews}`}
              />

              <div style={{ color: '#3a3457' }}>
                <span className='x'>
                  {getCurrencySign(currency)}
                  {getProductPrice(product.price, currency)}
                </span>
              </div>
              <div className='d-flex justify-content-center align-items-center mt-2'>
                {/* { showCartPlus && <AddToCartBtn productId={ product.asin } /> } */}

                <button
                  type='button'
                  className='btn btn-warning rounded-pill px-3 m-1'
                  style={{ background: '#ffd814' }}
                  onClick={handleAddToCartClick}
                >
                  {/* <i className='fas fa-cart-plus cart-plus-icon mr-2'   /> */}
                  {showSpinner && (
                    <span
                      className='spinner-border spinner-border-sm text-light mx-2'
                      role='status'
                      aria-hidden='true'
                    ></span>
                  )}
                  {showCheck && (
                    <span>
                      <i className='fas fa-check-circle ml-2 text-success' />{' '}
                      تم
                    </span>
                  )}
                  {!showCheck && <span>{r.add_to_cart}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ProductItemCard
