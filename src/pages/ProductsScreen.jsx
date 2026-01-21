import { useState, useEffect } from "react";
import { Col,   Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; 
import { useParams, useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/filters-sidebar/FiltersSidebar";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductItem from "../components/products/ProductItemCard";
import Toolbar from "../components/Toolbar";
import { listProducts } from "../store/actions/productActions";
import Paginate from "../components/Paginate";
// import { selectFilteredProducts } from "../store/reducers/productReducers";

// * Show products by Category/Department
// should contain filters, title, page number change...
const ProductsScreen = () => {
  const params = useParams(); 
  console.log(params);
  const paramsPage = params.page
  const keyword = params.keyword
  // const { pageNumber, keyword } = params; 
  // console.log(pageNumber)
  

  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  // const brand = searchParams.get('brand')
  // const keyword = searchParams.get('keyword')
  console.log(keyword) 

  const dispatch = useDispatch();

  const [pageDetails, setPageDetails] = useState({});
  const [viewMode, setViewMode] = useState("grid"); // grid by default
  const [showSidebar, setShowSidebar] = useState(false); // show fitlers sidebar
  // handle sort by dropdown

  // console.log(useParams())
  // {keyword: 'laptops', pageNumber: '2'}

  // * Get page details
  function getDetails(category) {
    switch (category) {
      case "laptops":
        return { title: "Laptops", category: "Laptops" };
      case "cellphones":
        return { title: "Cell Phones", category: "Cell Phones" };
      case "cameras":
        return { title: "Cameras & Photo", category: "Digital Cameras" };
      case "accessories":
        return { title: "Accessories", category: "Accessories" };
      default:
        return "No category found";
    }
  }

  const { loading, error, pages,pageNumber, sortBy, products } = useSelector(
    (state) => state.productList
  );

  // const filteredProducts = selectFilteredProducts(products, brands)
  // const filteredProducts = selectFilteredProducts(store.getState())
  //   const filteredProducts = useSelector(selectFilteredProducts);

  // console.log(filteredProducts)

  useEffect(() => { 
    // if (category) {
    //   let x = getDetails(category);
    //   setPageDetails(x);
    // }

    // if (!category) dispatch(listProducts('', pageNumber || 1))
    // else dispatch(listProductsByCategory(x.category, pageNumber))
    // dispatch(listProducts("", pageNumber, category, sortBy));
    dispatch(listProducts(keyword, paramsPage));

    if (category === "Laptops" || category === "Cell-Phones") {
      setShowSidebar(true);
    } else setShowSidebar(false);

    // dispatch(listProducts(1, 1, { category }))
  }, [dispatch, paramsPage, keyword, category]);

  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="page container">
      <Row>
        <div className="col-md-3 pl-5">
          <h3>{pageDetails.title}</h3>
        </div>
        <div className="col-md-9">
          <Toolbar setViewMode={setViewMode} />
        </div>
      </Row>

      <div className="row mb-3 mx-n2">
        {/* Products Grid */}
        {!loading && (
          <div className={showSidebar ? "col-md-3" : "col-2"}>
            {showSidebar && <FiltersSidebar category={category} />}
          </div>
        )}

        <div className="col">
          <div className="row bg-white">
            {loading && <Loader />}
            {!loading && (
              <>
                {products.length > 0 &&
                  products.map((product) => (
                    <Col
                      key={product.asin}
                      sm={12}
                      md={6}
                      lg={viewMode === "grid" ? 4 : 12}
                      className={viewMode === "grid" ? "mb-4" : "mb-2"}
                    >
                      <ProductItem
                        product={product}
                        grid={viewMode === "grid" ? true : false}
                      />
                    </Col>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Row>
        {!loading && pages > 1 && (
          <Paginate
            pages={pages}
            page={pageNumber}
            keyword={keyword ? keyword : ""}
          />
        )}
      </Row>
    </div>
  );
};

export default ProductsScreen;
