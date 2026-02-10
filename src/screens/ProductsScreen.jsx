import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import FiltersSidebar from "../components/filters-sidebar/FiltersSidebar";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductItem from "../components/products/ProductItemCard";
import Toolbar from "../components/Toolbar";
import { getAllProducts, listProducts } from "../store/actions/productActions";
import Paginate from "../components/Paginate";
import { selectFilteredProducts } from "../store/reducers/productReducers";
import Pagination from "../components/Pagination2";
import Pagination2 from "../components/Pagination2";
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
  const [showSidebar, setShowSidebar] = useState(true); // show fitlers sidebar 
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

  const { loading, error, pages, sortBy, productsAll } = useSelector(
    (state) => state.productList
  );
  const pageNumber = useSelector(state => state.filters.pageNumber)

  // # Products to display on current page after filtering in frontend
  function paginateProducts(filteredProducts, pageNumber) {
    const productsPerPage = 12;
    const indexOfLastProduct = pageNumber * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  }

  //   const filteredProducts = useSelector(selectFilteredProducts) 
  const filteredProducts = useSelector(selectFilteredProducts).sort((a, b) => {
    if (sortBy.key === 'price') {
      return sortBy.order === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy.key === 'newest') {
      // return sortBy.order === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
      return sortBy.order === 'asc' ? new Date(a.dateFirstAvailable) - new Date(b.dateFirstAvailable) : new Date(b.dateFirstAvailable) - new Date(a.dateFirstAvailable);
    } else if (sortBy.key === 'featured') {
      return 0; // No sorting for featured, as it's the default order
    } else {
      return 0; // Default case, no sorting
    }
  })

  console.log('Filtered products in component:', filteredProducts)

  const filterProductsByPage = paginateProducts(filteredProducts, pageNumber)
  console.log('Products by page:', filterProductsByPage)
  // console.log('Filtered products:', filteredProducts)

  // console.log(filteredProducts)
  // console.log(paginateProducts(filteredProducts, pageNumber))

  useEffect(() => {
    // const details = getDetails(category)
    dispatch(getAllProducts())
  }, [dispatch, paramsPage, keyword, category]);

  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="container " style={{ backgroundColor: "#d4dcf1" }}>
      <Row style={{ backgroundColor: "#c6c9d3" }} className="p-3">
        <div className="col-md-3 pl-5">
          <h3>{pageDetails.title}</h3>
        </div>
        <div className="col-md-9">
          <Toolbar setViewMode={setViewMode} />
        </div>
      </Row>

      <div className="row mb-2 ">
        {/* Products Grid */}
        <div className="col-md-3" >
          {showSidebar && <FiltersSidebar category={category} />}
        </div>

        <div className="col">
          <div className="row bg-white">
            {loading && <Loader />}
            {!loading && (
              <>
                {filterProductsByPage.length > 0 &&
                  filterProductsByPage.map((product) => (
                    <Col
                      key={product.asin}
                      sm={12}
                      md={6}
                      lg={viewMode === "grid" ? 4 : 12}
                    // className={viewMode === "grid" ? "mb-4" : "mb-2"    }
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
      {/* Pagination below works with backend pagination, not frontend filtering. */}
      {/* <Row>
        {!loading && pages > 1 && (
          <Paginate
            pages={pages}
            page={pageNumber}
            keyword={keyword ? keyword : ""}
          />
        )}
      </Row> */}
      <div className="p-3">
        {/* Pagination below works with frontend filtering, not backend pagination. */}
        <Pagination2 productsCount={filteredProducts.length} productsPerPage={12} />
      </div>
    </div>
  );
};

export default ProductsScreen;
