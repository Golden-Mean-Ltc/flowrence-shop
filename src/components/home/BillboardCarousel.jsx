 
import { Carousel } from 'react-bootstrap'

const BillboardCarousel = () => {

	// const baseUrl = import.meta.env.VITE_PUBLIC_URL + '/assets/billboard/'
	const baseUrl = import.meta.env.BASE_URL + '/assets/billboard/'
	// http://localhost:5173/assets/billboard/

	console.log('Base API URL:', baseUrl) // Debug log for base API URL
	// Images to show in billboard
	const billboardItems = [
		// src={import.meta.env.VITE_PUBLIC_URL + `/assets/img/projects/${id}.png`}
		{
			id: '1',
			link: ' ',
			image: baseUrl + 'banner-1.png',
		},
		{
			id: '2',
			link: ' ',
			image: baseUrl + 'banner-2.png',
		},
		{
			id: '3',
			link: ' ',
			image: baseUrl + 'banner-3.png',
		},
		{
			id: '4',
			link: ' ',
			image: baseUrl + 'banner-4.png',
		},
		{
			id: '5',
			link: ' ',
			image: baseUrl + 'banner-5.png',
		},
		{
			id: '6',
			link: ' ',
			image: baseUrl + 'banner-6.png',
		},
	]

	// <img src='images/billboard/banner-1.jpeg' alt='banner' />

	// Render carousel items
	const renderBillboardItems = () => {
		return billboardItems.map(item => (
			<Carousel.Item key={item.id}>
				<img
					className='d-block  '
					src={item.image}
					alt={`slide-${item.id}`}
				/>
				{/* <Carousel.Caption>
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption> */}
			</Carousel.Item>
		))
	}

	return <Carousel indicators={true}>{renderBillboardItems()}</Carousel>
}

export default BillboardCarousel
