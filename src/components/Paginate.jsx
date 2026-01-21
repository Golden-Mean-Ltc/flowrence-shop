import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "" }) => {
  const getLink = (x) => {
    return keyword ? `/search/${keyword}/page/${x + 1}` : `/products/page/${x + 1}`;
  };

  return (
    pages > 1 && (
      <Pagination className="justify-content-center">
        {[...Array(pages).keys()].map((x) => {
          // x starts from 0
          let number = x + 1;
          // console.log(number)
          // console.log(page)
          // console.log(number == page)
          // console.log(number === page)
          return (
            <li className={`page-item ${number == page ? 'active'  :  ''}`}  key={number} >
              <Link
                className='page-link'
                to={getLink(x)}
                // active={ number == page ? true : false }
              >
                {number}
              </Link>
            </li>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;

/*
<li className="page-item"  key={number}>
<Link 
className="page-link"
  to={getLink(x)}
  // active={number === page} 
>
  {number}
</Link>
</li>
*/
