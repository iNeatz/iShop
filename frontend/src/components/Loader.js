import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
	return (
		<div
			style={{
				height: '70vh',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Spinner
				animation='border'
				role='status'
				style={{
					width: '80px',
					height: '80px',
					margin: 'auto',
					display: 'block',
					borderWidth: '7px'
				}}
			>
				<span className='sr-only'>Loading...</span>
			</Spinner>
		</div>
	)
}

export default Loader
