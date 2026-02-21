import {  useEffect } from 'react'
import {  Row, Col } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
import { OrdersTable } from './OrdersTable'
import { Link } from 'react-router-dom'
// import { getUserDetails, updateUserProfile } from '../../store/actions/userActions'
// import { listMyOrders } from '../../store/actions/orderActions'
// import { USER_UPDATE_PROFILE_RESET } from '../../store/constants/userConstants'

const ProfileScreen = ({ history }) => { 

	const dispatch = useDispatch()

	const {   user , orders} = useSelector(state => state.auth)
	// const orders = []

	// const userUpdateProfile = useSelector(state => state.userUpdateProfile)
	// const { success } = userUpdateProfile

	// const orderListMy = useSelector(state => state.orderListMy)
	// const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

	useEffect(() => {
		if (!user) {
			history.push('/login')
		} else {
			if (!user || !user.name) {
				// dispatch({ type: USER_UPDATE_PROFILE_RESET })
				// dispatch(getUserDetails('profile'))
				// dispatch(listMyOrders())
			} else {
				// setName(user.name)
				// setEmail(user.email)
			}
		}
	}, [dispatch, history, user])
 

	return (
		<div className='screen pt-5'>
			<div className='container'>
				<div className="p-3">
						<h2>User Profile</h2>
				</div>
				<div className="d-flexx mb-3"> 
					<h5> {user.name}</h5>
					<h6>{user.email}</h6> 
				
				</div>
				<Row> 
					<Col   >
					<div className="mb-3">
						<div className="d-flex justify-content-around"><h2>My Orders</h2> 	<Link to="/">Return </Link></div>
					</div>
						<OrdersTable orders={orders} />
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default ProfileScreen
