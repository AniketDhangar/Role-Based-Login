
import { BrowserRouter } from 'react-router-dom'

import Routing from './Routing/Routing'

function App() {

  return (
    <>
      {/* <LoginForm/> */}
      <BrowserRouter>

        <Routing />
      </BrowserRouter>
    </>
  )
}

export default App
