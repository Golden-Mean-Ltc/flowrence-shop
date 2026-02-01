
import { Col,  Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch  } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	// addToCart, 
	removeItem, decreaseItemQuantity, increaseItemQuantity, 
	removeFromCart} from '../../store/cart/cartSlice'

const CartListItem = ({ item }) => {
	const dispatch = useDispatch()

	const itemName = item.name ? item.name : item.title

	return (
		<ListGroup.Item key={item.product} style={{ border: '1px solid #eee' }} className='py-3'>
			<Row>
				<Col sm={4} xs={3} className='d-flex align-items-center'>
					<Image
						src={item.mainImage.imageUrl}
						alt={item.name}
						fluid
						style={{ maxHeight: '90px' }}
					/>
				</Col>
				<div className='col'>
					<div className='d-flex justify-content-between mb-2'>
						<Link
							to={`/product/${item.product}`}
							data-toggle='tooltip-cart-item-name'
							data-placement={itemName}
							title={itemName}>
							{itemName.slice(0, 75)}
						</Link> 
					</div>
					<div className=' d-flex justify-content-between'>
						<Col >${item.price}</Col>
						<Col  >
							<div className="d-flex justify-items-evenly">
								<span className="badge btn-warning " onClick={() => dispatch(decreaseItemQuantity(item.asin))}  > - </span>
								<span className="mx-2"> {item.quantity}</span>
								<span className="badge btn-warning" onClick={() => dispatch(increaseItemQuantity(item.asin))}  > + </span>
							</div>
						</Col>
							<button className="btn-close mx-1" 
							// onClick={() => dispatch(removeItem(item.asin))} 
							onClick={() => dispatch(removeFromCart(item.asin))}   />
					</div>
				</div>
			</Row>
		</ListGroup.Item>
	)
}

export default CartListItem

/*
	<Form.Control
								as='select'
								value={item.quantity}
								onChange={e =>
									dispatch(addToCart(item.product, Number(e.target.value)))
								}>
								{[...Array(item.countInStock).keys()].map(x => (
									<option key={x + 1} value={x + 1}>
										{x + 1}
									</option>
								))}
							</Form.Control>
							*/