
import { ListGroup } from 'react-bootstrap'
import ProductListItem from './ProductListItem'
import { useSelector } from 'react-redux'


const WishlistScreen = () => {

    const products = useSelector(state => state.auth.likedProducts)

    return (
        <div className='screen container p-5'>
            <div className="p-2">
                <h3> My Wishlist | Liked Products <i className='fas fa-heart' /> </h3>
            </div>
            <ListGroup numbered={true}>
                {products.length > 0 && products.map((item, index) => <ProductListItem key={index} product={item} />)}
            </ListGroup>
        </div>
    )
}

export default WishlistScreen