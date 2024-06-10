
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Router from './routes/Router'
import { UserDataProvider } from './contexts/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ProductDataProvider } from './contexts/ProductContext'

function App() {

  return (
    <UserDataProvider>
      <ProductDataProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Router/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
      </ProductDataProvider>
      </UserDataProvider>
  )
}

export default App
