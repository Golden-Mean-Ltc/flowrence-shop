import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Row, Col, ListGroup, Image  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import CheckoutSteps from "./CheckoutSteps";
import { resetCart } from "../store/cart/cartSlice";
import SpinnerSuccessFail from "./SpinnerSuccessFail";
import OrderSummary from "./order/OrderSummary";
// import Loader from '../components/Loader';
// import { useCreateOrderMutation } from '../slices/ordersApiSlice';
// import { resetCart } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const [placeOrderStatus, setplaceOrderStatus] = useState(""); // loading,success, fail

  const cart = useSelector((state) => state.cart);

  //   const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    setplaceOrderStatus("loading");
    try {
      //   const res = await createOrder({
      //     orderItems: cart.cartItems,
      //     shippingAddress: cart.shippingAddress,
      //     paymentMethod: cart.paymentMethod,
      //     itemsPrice: cart.itemsPrice,
      //     shippingPrice: cart.shippingPrice,
      //     taxPrice: cart.taxPrice,
      //     totalPrice: cart.totalPrice,
      //   }).unwrap();

      //   navigate(`/order/${res._id}`);
      setTimeout(() => setplaceOrderStatus("success"), 600);
      setTimeout(() => dispatch(resetCart()),  900);
      
      // setTimeout(() =>  navigate(`/`), 1200);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="page container">
      <CheckoutSteps step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.mainImage.imageUrl}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.productTitle.slice(0, 95)}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {(item.quantity * (item.price * 100)) / 100}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          {/* <ListGroup.Item>
        {error && (
          <Message variant='danger'>{error.data.message}</Message>
        )}  
      </ListGroup.Item> */}
          <OrderSummary />

          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order <SpinnerSuccessFail status={placeOrderStatus} />
            </Button> 
          </ListGroup.Item>
          <p>
            {placeOrderStatus === "success" && <Link to="/">Return</Link>}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
