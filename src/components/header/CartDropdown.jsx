
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setShowCartModal } from '../../store/settingsSlice'

const CartDropdown = () => {
	const dispatch = useDispatch()
	const { cartItems } = useSelector(state => state.cart)
	const { showCartModal } = useSelector((state) => state.settings);


	// calculation total of quantity of items
	const cartItemsCount = cartItems.reduce(
		(acc, item) => acc + Number(item.quantity), 	0 )

	return (
		<div className='navbar-tool  '>
			<Link
				className='navbar-tool-icon-box bg-secosndary dropdown-toggle'
				//	to='/cart'
				onClick={() => dispatch(setShowCartModal(!showCartModal))}
			>
				<i className='navbar-tool-icon fas fa-shopping-cart' />
				{cartItems.length > 0 && (
					<div className='yt-spec-icon-badge-shape__badge '>
						{cartItemsCount}
					</div>
				)}
			</Link>
		</div>
	)
}

export default CartDropdown
