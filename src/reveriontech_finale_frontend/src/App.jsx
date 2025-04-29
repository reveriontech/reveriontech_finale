import React from 'react'
import Approutes from './routes/Approutes'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Router>
        <Approutes />
      </Router>
    </>
  )
}

export default App