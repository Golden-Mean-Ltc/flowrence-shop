import { useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/HorizontalList.css' // Import the CSS file 
import { formatStringForUrl, formatStringFromUrl } from '../utils' 

const HorizontalList = ({ items }) => {
  // const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'];
  const navigate = useNavigate() 

  const [
    searchParams,
    // , setSearchParams
  ] = useSearchParams()

  const selectedCategory = searchParams.get('category') || ''
  console.log(formatStringFromUrl(selectedCategory))

  return (
    <div className='scroll-container px-3'>
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
        <div
          key={index}
        //  className={`list-item ${selectedCategory === formatStringForUrl(item) ? 'selected' : ''}`}
          className='list-item'
          onClick={() => {
            console.log(item) 
            // console.log(item.toLowerCase().replace(/\s+/g, '-'))
            // # Replace spaces with dashes and convert to lowercase for URL
            navigate(`/products?category=${formatStringForUrl(item)}`) 
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default HorizontalList
