import { Table } from 'react-bootstrap'

export const OrdersTable = ({ orders }) => {
  return (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th>Adress</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{Date(order.createdAt).substring(0, 10)}</td>
            <td>${order.totalPrice}</td>
            <td>
              {order.isPaid ? (
                order.paidAt.substring(0, 10)
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
            </td>
            <td>
              {order.isDelivered ? (
                order.deliveredAt.substring(0, 10)
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
            </td>

            <td>
              {order.shippingAddress.governorate} -
              {order.shippingAddress.address}
            </td>
            <td>
                {order.shippingAddress.phoneNumber}
            </td>
            {/* <td>
											<Link to={`/order/${order._id}`}>
												<Button className='btn-sm' variant='light'>
													Details
												</Button>
											</Link>
										</td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
