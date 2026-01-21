
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MyComponent = () => (
  <Select options={options} />
)


const App2 = () => {
  return (
    <div className="row p-5">
    <p>Hello</p>
    <MyComponent />
  </div> 
  )
}

export default App2