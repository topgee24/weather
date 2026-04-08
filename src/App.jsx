import React from 'react'
import Weather from './components/Weather'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div className='App'>
      <Weather/>
      <ToastContainer />
    </div>
  )
}

export default App
