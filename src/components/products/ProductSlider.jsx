import { useState, useEffect } from 'react'
// Import css files
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductItemCard from './ProductItemCard'
import fakeApi from '../../_api/fakeApi'
import Loader from '../Loader'
import { toast } from 'react-toastify'


const ProductSlider = ({ title, url }) => {
	console.log('title:', title) // Debug log for title prop
	console.log('ProductSlider URL:', url) // Debug log for URL prop
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState([])

	const handleToast = (message) => {
		toast.success(message, {
			position: 'top-left',
			autoClose: 1500,
			hideProgressBar: true,
			theme: 'light',
		})
	}

	useEffect(() => {
		const fetchProducts = async () => {
			// const response = await fakeApi('/products/bestsellers')
			console.log(url)
			const response = await fakeApi(url)
			console.log(response.data)
			// return response.data

			setLoading(false)
			setProducts(response.data.products)
		}
		fetchProducts()

		// console.log(response.data)
	}, [url])

	const settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 4,
		autoplay: true,
		autoplaySpeed: 2000,
		cssEase: 'linear',
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	const settings2 = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	// shuffledArray = array.sort((a, b) => 0.5 - Math.random());
	// const products_ = products.sort((a, b) => 0.5 - Math.random())

	return (
		<>
			{title && (
				<div className='d-flex flex-wrap justify-content-between align-items-center border-bottom px-3 pt-3'>
					<h4>{title}</h4>
				</div>
			)}
			<div className='row'>
				<div className='col'>
					<div className='products-slider	'>
						{loading && <Loader />}
						  {products.length > 0 &&   <>
						 	{/* <Slider {...settings}>
							 	{ products.map((product) => (
									<ProductItemCard
										product={product}
										showHeartBtn={false}
										handleToast={handleToast}
										toastMessage={toast.added_to_cart}
										key={product.asin}
									/> 
								))}   
						 	</Slider> */}
							</>
						} 

					  
					</div>
				</div>
			</div>
			<div>
					  {/* <Slider {...settings2} >
							<div>
								<h3>1</h3>
							</div>
							<div>
								<h3>2</h3>
							</div>
							<div>
								<h3>3</h3>
							</div>
							<div>
								<h3>4</h3>
							</div> 
						</Slider> */}
			</div>
		</>
	)
}


export default ProductSlider
