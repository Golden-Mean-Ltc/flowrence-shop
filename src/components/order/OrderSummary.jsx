 
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { selectCartTotalPrice } from '../../store/cart/cartSlice'
import { useSelector } from 'react-redux';

const OrderSummary = () => {
    const cart = useSelector((state) => state.cart); 

 
  return (
    <Card className='mb-2'>
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h2>Order Summary</h2>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Items</Col>
          <Col>${selectCartTotalPrice(cart)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Shipping</Col>
          <Col>${cart.shippingPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Tax</Col>
          <Col>${cart.taxPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Total</Col>
          <Col>${cart.totalPrice}</Col>
        </Row>
      </ListGroup.Item> 
    </ListGroup>
  </Card>
  )
}

export default OrderSummary