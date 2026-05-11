import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setShowCartModal } from '../store/settingsSlice'

// Cart Fixed Footer Component to show number of items in cart
// and total price, with a button to go to cart page
const CartOverview = () => {
      const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
    const {   showCartModal } = useSelector((state) => state.settings);
//   const { r } = useSelector((state) => state.strings)

   const handleShowCartModal = () => dispatch(setShowCartModal(!showCartModal))

  return (
    <div className='fixed-element'>
      <div className='row p-2 align-items-center'>
        <div className='col col-md-2 pt-2'>
          <p
            className='x'
              onClick={() => handleShowCartModal()}
          >
            <i className='fas fa-shopping-cart' /> items in cart :{' '}
            {cartItems.length}{' '}
          </p>
        </div>
        <div className='col  col-md-2 pt-2'>
            <p>Total price : ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
        <div className='col-12 col-md-4  px-3'>
          <Link
            to='/cart'
            className='btn btn-success rounded-pill btn-lg w-100'
          > 
            {/* Submit order → */}
            تثبيت الطلب
          </Link> 
        </div> 
        <div className="col">
            {/* For Responsive Layout */}
        </div>
      </div>
    </div>
  )
}

export default CartOverview
