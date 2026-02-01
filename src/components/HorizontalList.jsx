import '../styles/HorizontalList.css' // Import the CSS file
 

const HorizontalList = ({ items }) => { 
  // const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'];

  return   <div className='scroll-container px-3'>
   
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
          <div key={index} className='list-item'>
            {item}
          </div>
        ))} 
    </div> 
   
   }

export default HorizontalList
