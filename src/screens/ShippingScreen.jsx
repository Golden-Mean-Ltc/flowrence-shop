import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { getCityById, iraq_cities } from "../constants/strings";

const ShippingScreen = () => {
  // Get user previous data n load this 
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // const [email, setEmail] = useState(shippingAddress.address || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  // const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(  shippingAddress.postalCode || "" );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState("Baghdad")
  const [selectedCityName, setSelectedCityName] = useState("Baghdad")
  const [selectedDistrict, setSelectedDistrict] = useState("Karkh")
  const [districtNames, setDistrictNames] = useState(["Karkh", "Rasafa"])

  const handleCitySelect = (e) => {
    // Access the selected value via event.target.value
    // setSelectedCity(e.target.value);
    console.log(e.target.value)
    let city = getCityById(e.target.value)
    console.log(city)
    setSelectedCity(e.target.value);
    setSelectedCityName(city.name);
    setDistrictNames(city.districtsList)
  }
  const handleDistrictSelect = e => {
    setSelectedDistrict(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        // city,
        postalCode,
        country,
      })
    );
    // history.push('/payment')
    navigate("/payment");
  };

  useEffect(() => {
    if (shippingAddress.address) {
      setAddress(shippingAddress.address);
      // setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setCountry(shippingAddress.country);
    }
  }, [shippingAddress]);

  return (
    <div className="page">
      <FormContainer>
        <CheckoutSteps step2 />
        <div className="py-2">
          <h1>Shipping Address</h1>
        </div>
        <Form onSubmit={submitHandler}>
          <div className="row">
            <div className="col">
              <Form.Label>City</Form.Label>
              <Form.Select id="city-select" value={selectedCity} onChange={handleCitySelect} >
                {iraq_cities.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) =>
                  <option key={index} value={item.id}>{item.name}</option>
                )}
              </Form.Select>
              <p>{selectedCity}</p>
              <p>{selectedCityName}</p>

            </div>

            <div className="col">
              <Form.Label>District</Form.Label>
              <Form.Select id="district-select" value={selectedDistrict} onChange={handleDistrictSelect} >
                {districtNames.map((item, index) =>
                  <option key={index} value={item}>{item}</option>
                )}
              </Form.Select>
              <p>{selectedDistrict}</p>
            </div>
          </div>


          <Form.Group className="mb-2" controlId="address">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
 

          <Form.Group className="my-2" controlId="postalCode">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="country">
            <Form.Label>Whatsapp Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
