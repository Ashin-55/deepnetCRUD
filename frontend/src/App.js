
import {Route,Routes} from "react-router-dom"

import Homepage from "./screens/Home"
import Login from "./screens/Login"
import Register from "./screens/Register"
import AddProduct from "./screens/AddProducts"

function App() {
  return (
  <Routes>
    <Route path="/" element={<Homepage/>} exact/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/addProduct" element={<AddProduct/>}/>
  </Routes>
  );
}

export default App;
