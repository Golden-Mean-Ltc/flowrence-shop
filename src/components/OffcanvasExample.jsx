
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useSelector } from 'react-redux'

function OffcanvasExample() {
  const cartItems = useSelector((state) => state.cart.cartItems)
  var expand = 'md' // false, 'sm', 'md', 'lg', 'xl', 'x
  return (
    <Navbar key={expand} expand={expand} style={{ background: '#1a2a73' }} >
      <Container >
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        {cartItems.length && <Nav.Link href='/cart' className='white'> 
          <i className="fas fa-shopping-cart " /> <span className="mx-2">{cartItems.length} </span>
        </Nav.Link>}
        <Navbar.Brand href='/' className="fw-bold text-white">Flowrence IQ</Navbar.Brand>

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3  '>
              <Nav.Link href='#action1'> <i className="fas fa-shopping-cart white"></i> </Nav.Link>

              {/* <NavDropdown
                title='Dropdown'
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action4'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action5'>
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default OffcanvasExample
