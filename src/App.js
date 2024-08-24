import './styles/css/App.css';
import SignInPage from "./Pages/SignInPage.js"
import SignUpPage from "./Pages/SignUpPage.js"
import ChatPage from "./Pages/ChatPage.js"
import AppContext from './Components/appcontext.js'

import { Route, Routes } from 'react-router-dom';
import { useState, } from "react";

function App() {
  const [user, setUser] = useState({});

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
