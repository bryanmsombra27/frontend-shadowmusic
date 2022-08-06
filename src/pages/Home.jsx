
import { useEffect, useState } from "react";
import Tracks from "../components/Tracks";
import Search from "../components/Search";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const code = new URLSearchParams(window.location.search).get("code");
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : false;
    const [accessToken, setaccessToken] = useState(null);
    const [tracks, settracks] = useState([]);
    const [tracksCopy, settracksCopy] = useState([]);

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const getToken = async () => {
        try {

            const res = await fetch(`${process.env.REACT_APP_API_URL}/login`,
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "code": code })
                });
            const data = await res.json();

            setaccessToken(data.accessToken)
            window.history.pushState({}, null, "/");
            localStorage.setItem("token", JSON.stringify(data.accessToken));
        } catch (error) {

            window.location = "/";
        }

    }

    useEffect(() => {
        if (code) {
            getToken();
        } else {
            setaccessToken(token)
        }
    }, [code]);



    return (
        <>
            <div className="flex mt-9 items-center justify-around gap-12">
                <h1 className="font-bold text-4xl text-center my-9 uppercase">Canciones</h1>

                <div className="flex gap-9 flex-grow-2 items-center space-x-9">
                    <Link to="/favorites">
                        <i className="fa-solid fa-heart fa-2x cursor-pointer mt-3"></i>
                    </Link>
                    <Search tracks={tracks} settracks={settracks} tracksCopy={tracksCopy} className="w-max" />
                    <i className="fa-solid fa-right-from-bracket fa-2x cursor-pointer" onClick={logOut} ></i>
                </div>
            </div>

            <div className="grid grid-cols-1 mx-auto justify-center items-center gap-0 contenedor    md:grid-cols-3 md:gap-14  container p-6">
                <Tracks token={accessToken} tracks={tracks} settracks={settracks} settracksCopy={settracksCopy} />

            </div>
        </>

    )

}

export default Home;