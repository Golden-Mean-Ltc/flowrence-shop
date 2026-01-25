 
import { Link,   useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup, 
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
// import { addToCart, removeFromCart } from "../store/cart/cartSlice";
import CartListItem from "../components/cart/CartListItem"; 
import { selectCartTotalItems, selectCartTotalPrice } from "../store/cart/cartSlice";
// import { addToCart, removeFromCart } from '../store/actions/cartActions'

// const CartScreen = ({ match, location, history }) => {
const CartScreen = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const cart = useSelector((state) => state.cart); 
  const { cartItems } = cart;

  const checkoutHandler = () => {
    // history.push('/login?redirect=shipping')
    // navigate('/login?redirect=/shipping');
    navigate('/shipping')
  };

  return (
    <div className="page">
      <div className="container">
        <div className="my-3">
          <h3>Shopping Cart</h3>
        </div>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <CartListItem item={item} key={item.asin} />
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal  
                  </h2>
                  <p>Total items: {  selectCartTotalItems(cart) }</p>
                 <p>Total price: {selectCartTotalPrice(cart)}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button 
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartScreen;
