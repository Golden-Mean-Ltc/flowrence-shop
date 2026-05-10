import { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'

const SideBar = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const departments = [
    { name: 'All Products', url: '/products' },
    { name: 'Books', url: '/products?category=books' },
    { name: 'Laptops', url: '/products?category=laptops' },
    { name: 'Cell Phones', url: '/products?category=cell-phones' },
    { name: 'Hot Deals', url: '/products?filter=hot-deals' },
    { name: 'Best Sellers', url: '/products?filter=best-sellers' },
    { name: 'New Arrivals', url: '/products?filter=new-arrivals' },
  ]

  return (
    <>
      <button
        style={{ all: 'unset' }}
        className='pr-2 clickable hide-on-large-screen'
        //  variant="primary"
        onClick={handleShow}
      >
        <i className='fas fa-bars white'></i>
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='list-unstyled'>
            {departments.map((dept, index) => (
              <li key={index}>
                <a href={dept.url} className='text-decoration-none'>
                  {dept.name}
                </a>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default SideBar
