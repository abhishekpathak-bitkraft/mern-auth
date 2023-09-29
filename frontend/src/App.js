import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Scenes/HomePage';
import Login from './Scenes/Login';
import Register from './Scenes/Register';
import Header from './Components/Header';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locals/en/transaltion.json";
import translationHi from './locals/hi/transaltion.json'
import { AuthContext, AuthProvider } from './Context/userContext';
import { useContext } from 'react';

const resources = {
  en: {
    translation: translationEN,
  },
  hi: {
    translation: translationHi,
  },
};

function App() {

  const { lang } = useContext(AuthContext);

  i18n.use(initReactI18next).init({
    resources,
    lng: `${lang}`,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  return (

    <>
      <BrowserRouter>

          <Header />
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />

          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
