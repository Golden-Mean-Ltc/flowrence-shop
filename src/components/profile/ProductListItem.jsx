
import { ListGroup } from 'react-bootstrap'
import { deleteProductFromLiked } from '../../store/auth/authSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const ProductListItem = ({ product }) => {
      const dispatch = useDispatch()

    return <>
        {product && <ListGroup.Item  >
            <div className="row">
                <div className='col-12 col-sm-4'>
                    <img
                        src={
                            product.imageUrl !== undefined
                                ? product.imageUrl
                                : 'product.imageUrlList[0]'
                        }
                        alt=''
                        style={{ maxHeight: '100px', maxWidth: '100px' }}
                    />
                </div>

                <div className='col-12  col-sm-6 '>
                    <Link to={`/product/${product._id}`}>
                    {product.title}
                    </Link>
                </div>
                <div className='col-12  col-sm-2  '>{product.price}  
                    <span className="badge text-bg-light float-right clickable"
                     onClick={() => dispatch(deleteProductFromLiked(product._id))}
                    >Remove</span>  </div>
            </div>
        </ListGroup.Item>}
    </>
}

export default ProductListItem