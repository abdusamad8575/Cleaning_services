import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pegas/home/Home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Admin from './pegas/admin/Admin';
import Checkout from './pegas/checkout/Checkout';
import Success from './components/success';


function App() {

  return (
    <>
    <div className='bg-secondary vh-100'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/order/listing' element={<Admin />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<Success />} />
      </Routes>
      </BrowserRouter>
      

    </div>
     
    </>
  )
}

export default App
