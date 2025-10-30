import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthContainer from "@/containers/AuthContainer.tsx";
import ProductsContainer from "@/containers/ProductsContainer.tsx";

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<AuthContainer/>}/>
          <Route path='/products' element={<ProductsContainer/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
