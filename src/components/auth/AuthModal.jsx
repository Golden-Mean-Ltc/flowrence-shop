 
import { Link } from 'react-router-dom'
import {  Row, Col, Modal } from 'react-bootstrap'
// import {   useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader' 
import SocialBtns from './SocialBtns'
// import { login } from '../../store'
import AuthForm from './AuthForm'

const AuthModal = ({ show, setShow }) => { 
 
    // const navigate = useNavigate()   // router v6

    const handleClose = () => setShow(false)

    // const { loading,     error, user  } = useSelector(state => state.auth)
    // const loading = true
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    // useEffect(() => {
    // 	if (user) {
    // 		history.push(redirect)
    // 	}
    // }, [history, user, redirect])

    // const submitHandler = e => {
    //     e.preventDefault()
    //     // dispatch(login({ email, password }))
    // }
    return (
        <div className='auth-page page' style={{ background: '#f6f6f6' }}>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title className='w-100 text-center'>Log in user</Modal.Title>
                </Modal.Header>
                <div className='auth-form-container'> 
                    {/* {error && <Message variant='danger'>{error}</Message>} */}
                    {/* {loading && <Loader />} */}
                    {/* Login form */}
                    <div className='px-5 py-3'>
                        <AuthForm />
                    </div>

                    <div className='position-relative mt-4'>
                        <hr className='bg-300' />
                        <div className='divider-content-center' style={{ color: '#a4a4a4' }}>
                            or Log in with
                        </div>
                    </div>
                    <SocialBtns />

                    <Row className='py-3'>
                        <Col>
                            New Customer?{' '}
                            <Link
                            //to={redirect ? `/register?redirect=${redirect}` : '/register'}
                            >
                                Register
                            </Link>
                        </Col>
                    </Row>
                </div>
                <Modal.Footer className=' '>
                    <p className='font-weight-light'>
                        Use &quot;john@mail.com&quot; and &quot;123&quot; as password
                    </p>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AuthModal
