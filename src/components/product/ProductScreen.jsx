import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../Rating";
import Message from "../Message";
import Loader from "../Loader";
// import { PRODUCT_CREATE_REVIEW_RESET } from "../store/constants/productConstants";
import { addToCart } from "../../store/cart/cartSlice";
import ProductDetailsTable from "../product/ProductDetailsTable";
import fakeApi from "../../_api/fakeApi";
import HeartBtn from "../HeartBtn";
import { toast, ToastContainer } from "react-toastify";
import ImagesModal from "./ImagesModal";

// * Product Page
// const ProductScreen = ({ history, match }) => {
const ProductScreen = () => {
  const r = useSelector((state) => state.strings.r)

  // # Product Image gallery modal 
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState( '') 
  const error = null
  // Handle Select for quantity to add in cart
  const [quantity, setquantity] = useState(1);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");

  const params = useParams();
  // console.log(params)  // {productId: 'B088NM43MB'}

  const dispatch = useDispatch();

  useEffect(() => {
    const getProductByID = async () => {
      setLoading(true)
      try {
        const res = await fakeApi("/products/id", params.productId);
        console.log(res);
        setProduct(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    getProductByID();
  }, [params.productId]);
  //   console.log(getProductByID().then((res) => console.log(res)));

  //   const productDetails = useSelector((state) => state.productDetails);
  //   const { loading, error, product } = productDetails;

  //   const userLogin = useSelector((state) => state.auth);
  //   const { user } = userLogin;

  //   const productReviewCreate = useSelector((state) => state.productReviewCreate);
  //   const {
  //     success: successProductReview,
  //     loading: loadingProductReview,
  //     error: errorProductReview,
  //   } = productReviewCreate;

  //   useEffect(() => {
  //     if (successProductReview) {
  //       setRating(0);
  //       setComment("");
  //     }
  //     if (!product._id || product._id !== match.params.id) {
  //       dispatch(listProductDetails(match.params.id));
  //       // dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
  //     }
  //   }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    console.log("addToCartHandler..");
    // dispatch({ type: 'cart/itemAdded', payload: product.asin }) 
    dispatch(addToCart(product.asin, quantity));
    handleToast(r.added_to_cart)
  };

  const handleToast = (message) => {
    toast.success(message)
  }

  const galleryRef = useRef(null);
  // # Convert product.imageUrlList to get 40px thumbnails 
  const makeImageGalleryUrlList = (imageUrlList) => {
    // let res = [{original: "", thumbnail: ""}] 
    const newList = imageUrlList
      ? imageUrlList.map((item) => {
        // console.log(item)
        return { original: item, thumbnail: item.replace("SL1500", "US40") }
      }) : []
    //  console.log(newList)
    return newList
  }

  // makeImageGalleryUrlList(product.imageUrlList)


  // const submitHandler = (e) => {
  // e.preventDefault();
  // dispatch(
  //   createProductReview(match.params.id, {
  //     rating,
  //     comment,
  //   })
  // );
  // };

  return <>
    <ToastContainer
      position="top-left"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      theme="light"
    />
    <div className="screen">
      <div className="container">
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <ImagesModal show={showModal} handleClose={handleClose} product={product} />

            <Row className="mb-3">
              <Col md={3}>
                <Image src={product.mainImage ? product.mainImage.imageUrl : ''}
                  alt={product.title} fluid />
                <div className="p-3 text-center">
                  <span className="clickable"
                    onClick={() => setShowModal(!showModal)}>
                    Click to see more images
                  </span>
                </div>
              </Col>
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>{product.productTitle}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.productRating ?
                        parseFloat(product.productRating.substring(0, 2)) : 4.5}
                      text={`${product.countReview} reviews`}
                    />
                  </ListGroup.Item>

                  <div
                    // className='collapse'
                    id="collapseExample"
                    style={{ maxHeight: "230px", overflow: "hidden" }}
                  >
                    {product.description && (
                      <ListGroup.Item>
                        Description: {product.description}
                      </ListGroup.Item>
                    )}
                  </div>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup>
                    <div className="x" style={{ minHeight: "100px" }}>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>quantity</Col>
                            <Col>
                              <Form.Control
                                as="select"
                                value={quantity}
                                onChange={(e) => setquantity(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    // [...Array(product.countInStock).keys()]
                                    // return : [0,1,2,3..]
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                    </div>
                    <div className="p-2">
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block btn-warning mb-3"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                      <div className=" text-center"    >
                        <p className="clickable">
                          Add to wishlist {' '} <HeartBtn product={product} handleToast={handleToast} />
                        </p>
                      </div>
                    </div>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <div className="col-md-2"></div>
              <div className="col-8">
                <h5>About this product</h5>
                <ul>
                  {product.features &&
                    product.features.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </Row>
            <hr />
            <Row>
              {product.details &&
                <div className="col-8 mx-auto">
                  <h5>Product details</h5>
                  <ProductDetailsTable details={product.details} />
                </div>
              }
            </Row >
            <Row className='mb-3'>
              <Col  md={2} />
              <Col sm={12} md={8}>
                <h2>Reviews</h2>
                {!product.reviews && (  <p>No Reviews</p>   )}
                {product.reviews &&  product.reviews.length < 0 &&   <p>No Reviews</p>  }
                {product.reviews && product.reviews.length > 0 && (
                  <ListGroup variant='flush'>
                    {product.reviews.map((review, index) => (
                      <ListGroup.Item key={index}>
                        <Rating rating={parseFloat(review.rating.substring(0, 2))} />
                        <strong>{review.text.substring(0, 400)}</strong>
                        <p>
                          {review.date} <br></br> By : {review.userName}
                        </p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )  }
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  </>
}

export default ProductScreen;
