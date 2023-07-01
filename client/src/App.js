import './App.css';
import {Button} from 'antd';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props)
{
  if(localStorage.getItem("spendwise-user"))
  {
    return props.children;
  }
  else
  {
    return <Navigate to="/login"></Navigate>;
  }
}

export default App;
