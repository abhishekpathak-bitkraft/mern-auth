import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../Context/userContext";
import Cookies from "js-cookie";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { setLang } = useContext(AuthContext);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang)
    Cookies.set("USER-LANG", newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <select value={i18n.language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="hi">Hindi</option>
    </select>
  );
};

export default LanguageSwitcher;