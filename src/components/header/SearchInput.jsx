import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'

const SearchInput = () => {
  const { language } = useSelector((state) => state.settings)
  const { r } = useSelector((state) => state.strings)
  // const history = useHistory()
  // const [ keyword, setKeyword ] = useState( '' )

  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      // history.push( `/search/${ keyword }` )
      navigate(`/search/${keyword.trim()}`)
      setKeyword('')
    } else {
      // history.push( '/' )
      navigate('/')
    }
  }

  return (
    <Form
      onSubmit={submitHandler}
      // className='w-100'
      className='mx-auto'
      style={{
        width: '440px',
        minWidth: '360px', 
      }}
    >
      {' '}
      <InputGroup
      size='lg'
      style={{}}
      >
        <Form.Control
          placeholder={r.search_products}
          //  aria-label="Recipient's username"
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          dir={language === 'arb' ? 'rtl' : 'ltr'}
        />
        <Button variant='warning' type='submit'>
          <i className='fa fa-search' aria-hidden='true' />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchInput
