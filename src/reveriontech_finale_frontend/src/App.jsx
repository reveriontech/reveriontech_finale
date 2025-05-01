import React from 'react'
import Approutes from './routes/Approutes'
import { BrowserRouter } from 'react-router-dom'

// For redux
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Approutes />
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App