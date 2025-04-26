
import { BrowserRouter } from 'react-router-dom'

import Routing from './Routing/Routing'
import { Provider } from 'react-redux'
import { persistor, store } from '../Redux/store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {

  return (
    <>
      {/* <LoginForm/> */}

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routing />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
