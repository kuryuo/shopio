import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthContainer from "@/containers/AuthContainer.tsx";


function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<AuthContainer/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
