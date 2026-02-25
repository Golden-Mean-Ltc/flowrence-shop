import { useRef } from 'react'; 
import Modal from 'react-bootstrap/Modal';
import ImageGallery from 'react-image-gallery';

const ImagesModal = ({show, handleClose, product}) => {  

      const galleryRef = useRef(null);
      // # Convert product.imageUrlList to get 40px thumbnails 
      const makeImageGalleryUrlList = (imageUrlList) => {
        // let res = [{original: "", thumbnail: ""}] 
        const newList = imageUrlList
          ? imageUrlList.map((item) => {
            // console.log(item)
            return { original: item, thumbnail: item.replace("SL1500", "US40") }
          }) : []
        //  console.log(newList)
        return newList
      }


  return (
    <Modal show={show} onHide={handleClose}
    size='lg' 
      className='product-gallery'>
        <Modal.Header closeButton >
          <Modal.Title  className='text-center pl-5'>
            {product.productTitle && <>
               {product.productTitle.substring(0,40)} 
            </>} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-3 m-auto' style={{ maxWidth: '540px' }}>  
           {product && product.imageUrlList &&  <ImageGallery
                  ref={galleryRef}
                  items={makeImageGalleryUrlList(product.imageUrlList)}
                  onSlide={(index) => console.log("Slid to", index)}
                />}     
        </Modal.Body> 
      </Modal>
  )
}

export default ImagesModal