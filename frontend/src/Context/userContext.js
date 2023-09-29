import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext();


export function AuthProvider({ children }) {

    let URL = process.env.REACT_APP_BACKEND_URL;

    const [token, setToken] = useState("")
    const [curruser, setCurrUser] = useState(null);
    const [lang, setLang] = useState("en");

    async function getData(userurl = "") {
        axios({
            method: "GET",
            baseURL: URL,
            url: `${userurl}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Barrer ${Cookies.get("AUTH-TOKEN")}`
            }
        }).then(res => {
            setCurrUser(res.data.message)
        })
            .catch(err => {
                if (err.response.status == 401) {
                    if (Cookies.get("AUTH-TOKEN")) {
                        alert("Token expired, logging out")
                        Cookies.remove("AUTH-TOKEN");
                        window.location.href = "/login"
                    }
                }
            })

    }

    const fetchCurrUser = async () => {
        getData("auth/get-user");
    }

    useEffect(() => {
        if (Cookies.get("USER-LANG")) {
            setLang(Cookies.get("USER-LANG"))
        }
    }, [])

    useEffect(() => {
        fetchCurrUser();
    }, [token])

    useEffect(() => {
        if (Cookies.get("AUTH-TOKEN")) {
            setToken(Cookies.get("AUTH-TOKEN"));
        }
    }, [Cookies.get("AUTH-TOKEN")])

    return (
        <AuthContext.Provider value={{ token, setToken, curruser, lang, setLang }}>
            {children}
        </AuthContext.Provider>
    )
}
