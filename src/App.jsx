
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Router from './routes/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, Store } from './redux/Store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={Store}>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Router/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
      </Provider>
     </PersistGate>
      
  )
}

export default App
