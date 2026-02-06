import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Button } from 'react-bootstrap'
import {
    resetCart,
    selectCartTotalItems,
    selectCartTotalPrice,
} from '../../store/cart/cartSlice'
import Message from '../Message'
import CartListItem from './CartListItem'

const CartModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClose = () => setShow(false)

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const checkoutHandler = () => {
        // history.push('/login?redirect=shipping')
        // navigate('/login?redirect=/shipping');
        navigate('/shipping')
    }

    return (
        <div className='container'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className='w-100 text-center'>
                        <h4>
                            {' '}
                            <i className='fas fa-shopping-cart ' /> سلة التسوق{' '}
                        </h4>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {cartItems.length === 0 ? (
                        <Message className='text-center'>
                            Your cart is empty  
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <CartListItem item={item} key={item.asin} />
                            ))}
                        </ListGroup>
                    )}
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            {/* <h2>Subtotal</h2> */}
                            <div className='d-flex justify-content-around p-2' style={{ fontSize: '1.2em' }} >
                                <div>Total items: {selectCartTotalItems(cart)}</div>
                                <div>Total price: {selectCartTotalPrice(cart)}</div>
                                <h5>المجموع</h5>
                            </div>
                            <div className="text-center clickable underline-on-hover" style={{ color: 'red', fontSize: '0.9em' }} >
                                <span className="badge text-bg-primary" 
                                onClick={() => {
                                    // Reset cart logic would go here
                                        dispatch(resetCart())
                                }}> Reset cart  </span>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Proceed To Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CartModal
