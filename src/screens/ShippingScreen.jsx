import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../store/cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import { getCityById, iraq_cities } from '../constants/strings'

const ShippingScreen = () => {
  // Get user previous data n load this
  const cart = useSelector((state) => state.cart)
  const language = useSelector((state) => state.settings.language)
  // const { shippingAddress } = cart;

  // const [email, setEmail] = useState(shippingAddress.address || "");
  const [address, setAddress] = useState('')
  // const [city, setCity] = useState(shippingAddress.city || "");
  const [phoneNumber, setPhoneNumber] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  // Initialize state for the checkbox
  const [isChecked, setIsChecked] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCityName, setSelectedCityName] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [districtNames, setDistrictNames] = useState([''])

  const handleCitySelect = (e) => {
    // Access the selected value via event.target.value
    // setSelectedCity(e.target.value);
    console.log(e.target.value)
    let city = getCityById(e.target.value)
    console.log(city)
    setSelectedCity(e.target.value)
    setSelectedCityName(city.name)
    setDistrictNames(city.districtsList)
    setSelectedDistrict(city.districtsList[0])
  }
  const handleDistrictSelect = (e) => {
    setSelectedDistrict(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        governorate: selectedCityName,
        address,
        phoneNumber,
        // city,
        // postalCode,
        // country,
      }),
    )
    // history.push('/payment')
    navigate('/payment')
  }

  /*
  useEffect(() => {
    if (shippingAddress.address) {
      setAddress(shippingAddress.address);
      // setCity(shippingAddress.city);
      setPhoneNumber(shippingAddress.phoneNumber);
      setCountry(shippingAddress.country);
    }
  }, [shippingAddress]);
  */

  return (
    <div className='page' dir={language == 'arb' ? 'rtl' : 'ltr'}>
      <FormContainer>
        <CheckoutSteps step2 />
        <div className='px-3'>
          <div className='pb-3'>
            <h2>عنوان التوصيل</h2>
          </div>
          <Form onSubmit={submitHandler}>
            <div className='row mb-3'>
              <div className='col'>
                <Form.Label>المحافظة</Form.Label>
                <Form.Select
                  id='city-select'
                  value={selectedCity}
                  onChange={handleCitySelect}
                >
                  {iraq_cities
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </Form.Select>
                {/* <p>{selectedCity}</p> */}
                {/* <p>{selectedCityName}</p> */}
              </div>

              <div className='col'>
                <Form.Label>القضاء</Form.Label>
                <Form.Select
                  id='district-select'
                  value={selectedDistrict}
                  onChange={handleDistrictSelect}
                >
                  {districtNames.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>العنوان</Form.Label>
              <Form.Control
                type='text'
                placeholder='اسم المنطقة او الحي - اقرب نقطة دالة'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='postalCode'>
              <Form.Label>رقم الهاتف</Form.Label>
              <Form.Control
                type='number'
                placeholder='07710000000'
                value={phoneNumber}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3' controlId='country'>
              <Form.Label> رقم واتساب</Form.Label>

              <Form.Control
                type='number'
                placeholder='07810000000'
                value={whatsappNumber}
                required
                onChange={(e) => setWhatsappNumber(e.target.value)}
              ></Form.Control>
              <Form.Check
                className='p-2'
                id='inline-checkbox-1'
                inline reverse
                label='نفس الرقم'
                name='group1'
                type='checkbox'
                checked={isChecked}
                onChange={(e) => {
                  setIsChecked(e.target.checked)
                  console.log(e.target.checked)

                  if (e.target.checked) {
                    console.log(phoneNumber)
                    setWhatsappNumber(phoneNumber)
                  }
                }}
              />
            </Form.Group>

            <div className='p-2'>
              <h6>العنوان الكامل</h6>
              <p>
                <span>{selectedCityName}</span> /{' '}
                <span>{selectedDistrict}</span> / <span>{address}</span>
                <span></span>
              </p>
            </div>
  
              <Button
                type='submit'
                variant='primary'
                size='lg'
                className='w-100'
              >
                تثبيت الطلب
              </Button> 
          </Form>
        </div>
      </FormContainer>
    </div>
  )
}

export default ShippingScreen
