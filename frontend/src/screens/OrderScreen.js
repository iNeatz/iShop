import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = () => {
	const cart = useSelector((state) => state.cart)
	const orderId = useParams().id
	const dispatch = useDispatch()

	//CALCULATE PRICES
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 0 : 100)
	cart.taxPrice = addDecimals(Number(0.13 * cart.itemsPrice).toFixed(2))
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2)

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	useEffect(() => {
		dispatch(getOrderDetails(orderId))
	}, [])

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Row>
			<Col md={8}>
				<ListGroup>
					<ListGroup.Item>
						<h2>Shipping</h2>
						<p>
							<strong>Name: {order.user.name}</strong>
						</p>
						<p>
							<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
						</p>
						<p>
							<strong>Address: </strong>
							{order.shippingAddress.address}, {order.shippingAddress.city},{' '}
							{order.shippingAddress.postalCode},{' '}
							{order.shippingAddress.country}
						</p>
						{order.isDelivered ? (
							<Message variant='success'>Delivered on {order.deliveredAt}</Message>
						) : (
							<Message variant='danger'>Not Delivered</Message>
						)}
					</ListGroup.Item>

					<ListGroup.Item>
						<h2>Payment Method</h2>
						<p>
							<strong>Method: </strong>
							{order.paymentMethod}
						</p>
						{order.isPaid ? (
							<Message variant='success'>Paid on {order.paidAt}</Message>
						) : (
							<Message variant='danger'>Not Paid</Message>
						)}
					</ListGroup.Item>

					<ListGroup.Item>
						<h2>Order Items</h2>
						{order.orderItems.length === 0 ? (
							<Message>Order is Empty</Message>
						) : (
							<ListGroup>
								{order.orderItems.map((item, index) => (
									<ListGroup.Item key={index}>
										<Row>
											<Col md={1}>
												<Image src={item.image} alt={item.name} fluid rounded />
											</Col>
											<Col>
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</Col>
											<Col md={4}>
												{item.qty} x ${item.price} = ${item.qty * item.price}{' '}
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
				<Card>
					<ListGroup style={{ borderRadius: 0 }}>
						<ListGroup.Item>
							<h2>Order Summary</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Items</Col>
								<Col>${order.itemsPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Shipping</Col>
								<Col>${order.shippingPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Tax</Col>
								<Col>${order.taxPrice}</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup>
				</Card>

				<Card className='mt-4'>
					<ListGroup style={{ borderRadius: 0 }}>
						<ListGroup.Item>
							<Row>
								<Col>Total</Col>
								<Col>${order.totalPrice}</Col>
							</Row>
						</ListGroup.Item>
						{error && (
							<ListGroup.Item>
								<Message variant='danger'>{error}</Message>
							</ListGroup.Item>
						)}
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default OrderScreen
