import React, { useState, useEffect } from "react";
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
import { addToCart, itemAdded } from "../../store/cart/cartSlice";
import ProductDetailsTable from "../product/ProductDetailsTable";
import fakeApi from "../../_api/fakeApi"; 

// * Product Page
// const ProductScreen = ({ history, match }) => {
const ProductScreen = () => {

	const [product, setProduct] = useState({}) 
	const [loading, setLoading] = useState(false) 
	const [error, setError] = useState( '') 
  // Handle Select for quantity to add in cart
  const [quantity, setquantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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
  }, []);
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
  };

  // const submitHandler = (e) => {
    // e.preventDefault();
    // dispatch(
    //   createProductReview(match.params.id, {
    //     rating,
    //     comment,
    //   })
    // );
  // };

  return (
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
            <Row className="mb-5">
              <Col md={3}>
                <Image src={product.mainImage ? product.mainImage.imageUrl : '' } alt={product.title} fluid />
              </Col>
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>{product.productTitle}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.productRating ? parseFloat(product.productRating.substring(0, 2)) : 4.5}
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
                    <div className="x" style={{ minHeight: "180px" }}>
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
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out Of Stock"}
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
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <hr />
            <Row className="mb-5">
              <div className="col-2"></div>
              <div className="col-8">
                <h5>About this product</h5>
                <ul>
                  {product.features &&
                    product.features.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </Row>
            <hr />
            <Row>
              <div className="col-8 mx-auto">
                <h5>Product details</h5>
                <ProductDetailsTable details={product.details} />
              </div>
            </Row>
            <Row>
               <Col sm={12} md={8}>
							<h2>Reviews</h2>
							{product.reviews && product.reviews.length === 0 && (
								<Message>No Reviews</Message>
							)}
              {product.reviews && product.reviews.length> 0 && (
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
                    <Rating rating={parseFloat(review.rating.substring(0, 2)) } />
										<strong>{review.text}</strong> 
										<p>
											{review.date} <br></br> By : {review.userName}
										</p> 
									</ListGroup.Item>
								))} 
							</ListGroup>
              )}
						</Col>  
            </Row> 
          </>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
