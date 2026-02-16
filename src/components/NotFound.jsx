import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='screen container'>
        <h1 className='text-center mt-5'>404 - Page Not Found</h1>
        <p className='text-center'>The page you are looking for does not exist.</p>
        <div className='text-center'>
          <Link to='/' className='btn btn-primary mt-3'>Go to Home</Link>
        </div>
    </div>
  )
}

export default NotFound