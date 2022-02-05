import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import Notes from "./components/Notes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("/users/verify", {
          headers: { Authorization: token },
        });
        console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/r" element={<Register setIsLogin={setIsLogin} />} />
        <Route path="/n" element={<Notes setIsLogin={setIsLogin} />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
