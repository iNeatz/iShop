import { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

    const navigate = useNavigate()

	if (!shippingAddress) {
		navigate('/shipping')
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()

		dispatch(savePaymentMethod(paymentMethod))

		navigate('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>

					<Col className='mt-2'>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type='radio'
							label='Cash on Delivery'
							id='CashOnDelivery'
							name='paymentMethod'
							value='Cash On Delivery'
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button type='submit' className='mt-3' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
