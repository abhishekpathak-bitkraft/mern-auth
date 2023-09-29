import { useContext, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { AuthContext } from "../Context/userContext";

const HomePage = () => {

    let navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get("AUTH-TOKEN")) {
            navigate("/login")
        }
    }, [])

    const { curruser } = useContext(AuthContext)

    // console.log(curruser)
    return (
        <>
            Name:            {curruser&& 
                curruser.name
            }
            <br />
            Email: {curruser && curruser.email}
        </>
    )
}
export default HomePage;

