import { useState } from 'react'
import {  Offcanvas } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const SideBar = () => {
      const { r } = useSelector((state) => state.strings)


  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const departments = [
    { name: r.all_products, url: '/products' },
    { name: r.books, url: '/products?category=books' },
    { name: r.laptops, url: '/products?category=laptops' },
    { name: r.cell_phones, url: '/products?category=cell-phones' },
    { name: r.hot_deals, url: '/products?filter=hot-deals' },
    { name: r.best_sellers, url: '/products?filter=best-sellers' },
    { name: r.latest_products, url: '/products?filter=latest' },
  ]

  return (
    <>
      <button
        style={{ all: 'unset' }}
        className='px-2 clickable hide-on-large-screen'
        //  variant="primary"
        onClick={handleShow}
      >
        <i className='fas fa-bars white'></i>
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {r.departments}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='list-group list-unstyled'>
            {departments.map((dept, index) => (
              <li key={index}  className='list-group-item'>
                <a href={dept.url} className='text-decoration-none text-dark' onClick={handleClose}>
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
