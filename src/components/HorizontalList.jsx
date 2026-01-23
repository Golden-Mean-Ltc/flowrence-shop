import '../styles/HorizontalList.css' // Import the CSS file
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const HorizontalList = ({ items }) => {
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  // const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'];

  return (
    <>
      <div className='scroll-container mb-2'>
        <div
        onClick={handleShow}
          className='list-item'
          style={{
            minWidth: '60px',
            //  background: '#2a2d5a'
          }}
        >
          All
        </div>
        {items.map((item, index) => (
          <div key={index} className='list-item'>
            {item}
          </div>
        ))}
      </div> 

      <Modal
        show={showModal}
        onHide={handleClose}
        size='lg'
        // aria-labelledby='contained-modal-title-vcenter'
        // centered
        className="mt-5"
       
      >
        <Modal.Header closeButton>
          <Modal.Title>All Departments</Modal.Title>
        </Modal.Header>
        <Modal.Body  >
          <div className="card" style={{height: '300px'}}>
            <p>Woohoo, you are reading this text in a modal!</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HorizontalList
