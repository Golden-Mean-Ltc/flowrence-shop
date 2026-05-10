/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import FiltersSidebar from "../filters-sidebar/FiltersSidebar";
import Loader from "../Loader";
import Message from "../Message";
import ProductItemCard from "./ProductItemCard";
import Toolbar from "../Toolbar";
// import Paginate from "../components/Paginate";
import { selectFilteredProducts } from "../../store/reducers/productReducers";
import Pagination2 from "../Pagination2";
import fakeApi from "../../_api/fakeApi";
import { clearFilters, setFilter, setPageNumber } from "../../store/filters/filtersSlice";
import { formatStringFromUrl } from "../../utils";
import { reset } from "../../store/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";

// * Show products by Category/Department
// should contain filters, title, page number change...
const ProductsScreen = () => {
  // const params = useParams();
  // console.log(params);
  // const paramsPage = params.page
  // const keyword = params.keyword  
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const urlCategory = searchParams.get('category') || ''
  // const category = searchParams.get('category')
  // const brand = searchParams.get('brand')
  // const keyword = searchParams.get('keyword') 
  // console.log(query)

  const dispatch = useDispatch();

  const [pageDetails, setPageDetails] = useState({});
  const [viewMode, setViewMode] = useState("grid"); // grid by default
  const [showSidebar, setShowSidebar] = useState(true); // show fitlers sidebar 

  const handleToast = (message) => {
    toast.success(message )
  }

  // handle sort by dropdown
  // console.log(useParams())
  // {keyword: 'laptops', pageNumber: '2'}

  // * Get page details
  /*
  function getPageDetails(category) {
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
  */

  const { loading, error, sortBy } = useSelector(
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

  // console.log('Filtered products in component:', filteredProducts)

  const filterProductsByPage = paginateProducts(filteredProducts, pageNumber)
  // console.log('Products by page:', filterProductsByPage)
  // console.log('Filtered products:', filteredProducts)

  useEffect(() => {
    // const details = getDetails(category) 
    const getAllProducts = async () => {
      // # Set laoding
      dispatch({ type: 'PRODUCT_LIST_REQUEST' })
      try {
        const res = await fakeApi('/products', { keyword: query })
        // console.log(res) // { data: { products: [], page: 1, pages: 5 } }
        dispatch({
          type: 'PRODUCT_LIST_SUCCESS',
          payload: res.data,
        })
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    getAllProducts()
    // setPageDetails(getPageDetails(category))

    // }, [dispatch, paramsPage, keyword, category]);
  }, [dispatch, query]);

  useEffect(() => {
    // Whenever filters or sorting change, reset to page 1
    if (urlCategory) {
      dispatch(clearFilters()) // Clear existing filters before applying new category filter
      dispatch( 
        setFilter({
          filterName: 'category',
          filterValue: formatStringFromUrl(urlCategory),
          changeType: 'added',
        }),
      )
    }
    dispatch(setPageNumber(1))
  }, [dispatch, urlCategory])

  if (error) return <Message variant="danger">{error}</Message>;

  return <>
   <ToastContainer
          position="top-left"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false} 
          theme="light" 
        />
    <div className="container " style={{ backgroundColor: "#eceef3" }}>
      <Row style={{ backgroundColor: "#c0cbf0" }} className="p-2">
        <div className="col-md-3 pl-5">
          <h3>{pageDetails.title}</h3>
        </div>
        <div className="col-md-9">
          <Toolbar setViewMode={setViewMode} />
        </div>
      </Row>
      {searchParams.get('q') && (
        <div className="align-items-center mt-3 text-center">
          <p>Search results for  &quot;{query}&quot;
            <span className="mx-2">( {filteredProducts.length} products found )</span>
            <span onClick={() => setSearchParams("")} className="clickable text-decoration-underline mx-2">clear</span>
          </p>
        </div>
      )} 


      <div className="row mb-2 ">
        {/* Products Grid */}
        <div className="d-none d-md-block col-md-3 " >
          {showSidebar && <FiltersSidebar
          //  category={category} 
          />}
        </div>

        <div className="col ">
          <div className="row bg-white">
            {loading && <Loader />}
            {!loading && (
              <>
                {filterProductsByPage.length > 0 &&
                  filterProductsByPage.map((product) => (
                    <Col
                      key={product.asin}
                      xs={viewMode === "grid" ? 6 : 12}
                      sm={viewMode === "grid" ? 6 : 12}
                      md={viewMode === "grid" ? 4 : 12}
                      lg={viewMode === "grid" ? 3 : 12}
                    // className={viewMode === "grid" ? "mb-4" : "mb-2"    }
                    >
                      <ProductItemCard
                        product={product}
                        grid={viewMode === "grid" ? true : false}
                          handleToast={handleToast} 
                          showHeartBtn={viewMode === "grid" ? false : true}
                      />
                    </Col>
                  ))}
                {filteredProducts.length === 0 && (
                  <div className="p-5 text-center">
                    <h4>No products found matching your criteria.</h4>
                  </div>
                )}
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
</>;
}

export default ProductsScreen;
