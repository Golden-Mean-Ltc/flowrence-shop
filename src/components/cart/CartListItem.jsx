 
import {   Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../store/cart/cartSlice'

const CartListItem = ({ item }) => {
	const dispatch = useDispatch()

	const itemName = item.name ? item.name : item.title

	return (
		<ListGroup.Item key={item.product} style={{ border: '1px solid #eee' }} className='py-3'>
			<Row>
				<Col sm={4} xs={3} className='text-center'>
					<Image
						src={item.mainImage.imageUrl}
						alt={item.name}
						fluid
						style={{ maxHeight: '90px' }}
					/>
				</Col>
				<div className='col'>
					<div className='d-flex justify-content-between'>
						<Link
							to={`/product/${item.product}`}
							data-toggle='tooltip-cart-item-name'
							data-placement={itemName}
							title={itemName}>
							{itemName.slice(0, 75)}
						</Link>
						<button className="btn-close mx-1" onClick={() => dispatch(removeFromCart(item.asin))} />
					</div>
					<div className='row'>
						<Col md={2}>${item.price}</Col>
						<Col md={2}>
							<Form.Control
								as='select'
								value={item.qty}
								onChange={e =>
									dispatch(addToCart(item.product, Number(e.target.value)))
								}>
								{[...Array(item.countInStock).keys()].map(x => (
									<option key={x + 1} value={x + 1}>
										{x + 1}
									</option>
								))}
							</Form.Control>
						</Col> 
					</div>
				</div>
			</Row>
		</ListGroup.Item>
	)
}

export default CartListItem
