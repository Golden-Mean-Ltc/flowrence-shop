import { useEffect, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'

const SearchInput = () => {
  const { language } = useSelector((state) => state.settings)
  const { r } = useSelector((state) => state.strings)
  // const history = useHistory() 

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  // const keyword = searchParams.get('keyword') || ''    

  // FIX: uncontrolled input - urlKeyword may be undefined
  // const [keyword, setKeyword] = useState(urlKeyword || '')
  const [keyword, setKeyword] = useState(query || "")

  useEffect(() => {
    setKeyword(query)
  }, [query])


  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      // history.push( `/search/${ keyword }` )
      // navigate(`/search/${keyword.trim()}`)
      // setKeyword('')
      setSearchParams((prev) => ({ ...prev, q: keyword.trim() }))
      navigate(`/search?q=${keyword.trim()}`)
      console.log(keyword)
    } else {
      // history.push( '/' )
      // navigate('/')
      // If the input is empty, remove the 'filter' param from the URL
      setSearchParams({});
    }
  }

  return (
    <Form
      onSubmit={submitHandler}
      // className='w-100'
      className='mx-auto'
      style={{
        minWidth: '380px',
        width: '100%',
        maxWidth: '500px'
      }}
    >
      {' '}
      <InputGroup
        size='lg'
        style={{}}
      >
        <Form.Control
          placeholder={r.search_products}
          type='text'
          name='q'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          dir={language === 'arb' ? 'rtl' : 'ltr'}
        />
        <Button
      //   variant='warning' 
        type='submit' style={{background:'#ffce12'}}>
          <i className='fa fa-search' aria-hidden='true' />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchInput
