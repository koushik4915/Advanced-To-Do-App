import "./App.css";
import LoginPage from "./assets/LoginPage";
import Navbar from "./assets/Navbar";
import SignUp from "./assets/SignUp";
import Userlsit from "./assets/Userlsit";
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/user"} element={<Userlsit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
