
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserDropdown from './UserDropdown'
import CartDropdown from './CartDropdown'
import DepartmentsDropdown from './DepartmentsDropdown'
import CurrencyDropdown from './CurrencyDropdown'
import LanguageDropdown from './LanguageDropdown'
import SearchInput from './SearchInput';
import { setShowAuthModal } from '../../store/settingsSlice'

const Header = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { r } = useSelector(state => state.strings)
  const { showAuthModal } = useSelector((state) => state.settings);

  const handleShowAuthModal = () => dispatch(setShowAuthModal(!showAuthModal))

  // console.log(user)

  return (
    <header>
      <Navbar
        variant='dark'
        //expand='lg'
        //	collapseOnSelect
        className='p-3 flex-wrap'
      >
        <Link to='/' className='navbar-brand hide-on-small-screen flex-fill'>
          <i className='fas fa-gem gold'></i> BEMART
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <div className="flex-fill">
          <SearchInput />
        </div>
     <div className="flex-fill d-flex justify-content-center align-items-center">
         <CartDropdown />

        <LanguageDropdown />

        <div className='p-1'>
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <Link className='nav-link'
              // to='/login' 
              onClick={handleShowAuthModal}>
              <i className='fas fa-user'></i> {r.sign_in}
            </Link>
          )}
        </div>
        {user && user.isAdmin && (
          <NavDropdown title='Admin' id='adminmenu'>
            <Link to='/admin/userlist'>
              <NavDropdown.Item>Users</NavDropdown.Item>
            </Link>
            <Link to='/admin/productlist'>
              <NavDropdown.Item>Products</NavDropdown.Item>
            </Link>
            <Link to='/admin/orderlist'>
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </Link>
          </NavDropdown>
        )}
        <UserDropdown />
     </div>
      </Navbar> 
        <div className='navbar-footer d-flex justify-content-evenly align-items-center'>
          <div className="p-2">
            <DepartmentsDropdown title={r.departments} />
          </div>
          <div className='p-2 clickable'>
            <Link to='/products'> All Products </Link>
          </div>
          <div className='p-2 clickable'>
            <Link to='/products'>{r.best_sellers}</Link>
          </div>
          <div className='p-2 clickable'>
            <Link to='/hot-deals'>{r.hot_deals}</Link>
          </div>
          {/* <div className='p-2 flex-fill clickable'>
          <Link to='/products/Laptops'>{r.laptops}</Link>
        </div> */}
          {/* <div className='p-2 flex-fill clickable'>
          <Link to='/products/Cell-Phones'>{r.cell_phones}</Link>
        </div> */}
          <div className="p-2">
            <CurrencyDropdown />
          </div> 
      </div>
    </header>
  )
}

export default Header
