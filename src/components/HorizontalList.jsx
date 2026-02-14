import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/HorizontalList.css' // Import the CSS file
import { useEffect } from 'react';
import { formatStringForUrl, formatStringFromUrl } from '../utils';
import { useDispatch } from 'react-redux';
import { setFilter, setPageNumber } from '../store/filters/filtersSlice';


const HorizontalList = ({ items }) => {
  // const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'];
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [searchParams
    // , setSearchParams
  ] = useSearchParams()

  const selectedCategory = searchParams.get('category') || ''
  console.log(formatStringFromUrl(selectedCategory))

  useEffect(() => {
    console.log(selectedCategory)  // if category=electronics => selectedCategory = electronics
    if (selectedCategory) {
      // If a category is selected, navigate to the products page with the category query parameter
      navigate(`/products?category=${selectedCategory}`);
    } else {
      // If no category is selected, navigate to the products page without any query parameters
      navigate('/products');
    }
  }, [selectedCategory, navigate]);

  return <div className='scroll-container px-3'>
    <div
      className='list-item'
      style={{
        minWidth: '60px',
        //  background: '#2a2d5a'
      }}
    >
      All
    </div>
    {items.map((item, index) => (
      <div key={index}
        className={`list-item ${selectedCategory === formatStringForUrl(item) ? 'selected' : ''}`}
        onClick={() => {
          console.log(item)

            dispatch(setFilter({ filterName: 'category', filterValue: item, changeType: 'added' }))
          dispatch(setPageNumber(1))
          
          console.log(item.toLowerCase().replace(/\s+/g, '-'))
          // # Replace spaces with dashes and convert to lowercase for URL
          navigate(`/products?category=${formatStringForUrl(item)}`)
          // searchParams.set('category', formatStringForUrl(item))
          // setSearchParams(searchParams)
        
        }}>
        {item}
      </div>
    ))}
  </div>

}

export default HorizontalList
