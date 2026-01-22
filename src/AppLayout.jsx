import { Outlet, useNavigation } from 'react-router-dom'
import Header from './components/header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OffcanvasExample from './components/OffcanvasExample'
import SearchBar from './components/header/SearchBar'
import HorizontalList from './components/HorizontalList'

const AppLayout = () => {
  const navigation = useNavigation()
  // const isLoading = navigation.state === 'loading';

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {/* <ToastContainer /> */}
      {/* <Header /> */}
      <header>
        <OffcanvasExample />
        <SearchBar />
        <HorizontalList items={['one', 'two', 'three', 'four']} />
      </header>

      <main className='mx-auto  '>
        <Outlet />
      </main>

      {/* <CartOverview /> */}
    </>
  )
}

export default AppLayout
