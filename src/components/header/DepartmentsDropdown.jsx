
import { Link } from 'react-router-dom'
import { categories } from '../../constants/strings'
import { formatStringForUrl } from '../../utils'
import { useSelector } from 'react-redux';

const DepartmentsDropdown = ({ title }) => {

  const { language } = useSelector((state) => state.settings);

  return (
    <div className='nav-item dropdown flex-fill '>
      <div
        className='nav-link dropdown-toggle'
        to='#'
        id='navbarDropdown'
        role='button'
        data-toggle='dropdown'
        aria-expanded='false'>
        {title}
      </div>
      <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
        {categories.map((item, index) =>
          <Link key={index}
            className='dropdown-item'
            to={`/products?category=${formatStringForUrl(item[0])}`}>
            {language === 'arb' ? item[1] : item[0]}
          </Link>
        )}
      </div>
    </div>
  )
}

export default DepartmentsDropdown
