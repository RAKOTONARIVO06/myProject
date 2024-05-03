import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./pages/Layout";
import Visitor from "./pages/visitor/visitor";
 export default  function App() {
    
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Visitor />}/>
            </Route>
          </Routes>
        </BrowserRouter>

        
      );
   
  }
  
  
  

