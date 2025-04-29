import React from 'react'
import Approutes from './routes/Approutes'
import { BrowserRouter as Landing } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Landing>
        <Approutes />
      </Landing>
    </>
  )
}

export default App