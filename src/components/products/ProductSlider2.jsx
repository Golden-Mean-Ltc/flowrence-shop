import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import fakeApi from '../../_api/fakeApi';
import { useEffect, useState } from 'react';
import Loader from '../Loader';
import ProductItemCard from './ProductItemCard';


const ProductSlider2 = ({ title, url }) => {
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
                        <Swiper
                            spaceBetween={16}
                            slidesPerView={4}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev"
                            }}
                            grabCursor={true}
                            modules={[EffectCards, Autoplay]}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                            {/* <SwiperSlide>Slide 2</SwiperSlide> */}
                            {/* <SwiperSlide>Slide 3</SwiperSlide> */}
                            {/* <SwiperSlide>Slide 4</SwiperSlide> */}
                            {loading && <Loader />}
                            <>
                                {products.length > 0 && products.map((product) => (
                                    <SwiperSlide key={product.asin}>
                                        <ProductItemCard
                                            product={product}
                                            showHeartBtn={false}
                                            handleToast={handleToast}
                                            //toastMessage={toast.added_to_cart}
                                            key={product.asin}
                                        />
                                    </SwiperSlide>

                                ))}
                            </>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSlider2