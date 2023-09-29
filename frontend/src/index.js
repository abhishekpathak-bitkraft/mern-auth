import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { AuthProvider } from './Context/userContext';
import axios from 'axios';
import Cookies from 'js-cookie';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.interceptors.response.use((response) => {
  // if (response.status == 200) {
  //   if (Cookies.get("AUTH-TOKEN")) {
  //     alert("Token expired, logging out")
  //     Cookies.remove("AUTH-TOKEN");
  //     window.location.href = "/login"
  //   }
  // }
  // console.log(response.status);
  if (response.status) {
    if (response.data?.expired) {
      if (Cookies.get("AUTH-TOKEN")) {
        alert("Token expired, logging out")
        Cookies.remove("AUTH-TOKEN");
        window.location.href = "/login"
      }
    }
  }
  return response;
})

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
