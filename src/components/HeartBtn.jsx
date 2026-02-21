
import { addProductToLiked, deleteProductFromLiked } from '../store/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const HeartBtn = ({ product, handleToast , toastMsg="Added to whishlist!" }) => {
    const dispatch = useDispatch()
    const productExistsInLiked = useSelector((state) => state.auth.likedProducts.find((p) => p._id === product._id))


    return <> 
        {productExistsInLiked ? (
            <i className="fas fa-heart ml-1 fs-5" style={{ color: '#84d31e' }}
                onClick={() => dispatch(deleteProductFromLiked(product._id))}
            ></i>
        ) : (
            <i className="far fa-heart ml-1 fs-5" style={{ color: '#cccccc' }}
                onClick={() => {
                    dispatch(addProductToLiked({ _id: product._id, title: product.productTitle, imageUrl: product.mainImage.imageUrl, price: product.price, liked: true }))
                    handleToast(toastMsg) 
                }}
            ></i>
        )}
    </>
}

export default HeartBtn