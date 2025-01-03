import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const Track = () => {
    const navigate = useNavigate();
    const params = useParams()
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : false;
    const [track, settrack] = useState({});

    const saveFavorites = (track) => {
        const heartIcon = document.getElementById(track.id);


        heartIcon.classList.remove("fa-regular")
        heartIcon.classList.add("fa-solid")

        const favoritos = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        const alreadyFavorite = favoritos.find(song => song.id == track.id);

        if (
            !alreadyFavorite) {
            favoritos.push(track)

        }

        localStorage.setItem("favorites", JSON.stringify(favoritos));
    }

    const isFavorite = (id) => {
        const favoritos = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        const isFavorite = !!favoritos.find(fav => fav.id == id)


        return isFavorite;

    }


    useEffect(() => {
        const fetchtracks = async () => {
            try {
                const res = await fetch(`https://api.spotify.com/v1/tracks/${params.id}`, {
                    headers: {
                        "Authorization": `Bearer  ${token}`
                    }
                })
                const data = await res.json();

                console.log(data, "TRACK")
                settrack(data);





                if (data.error) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }

            } catch (error) {
                navigate("/login");

            }

        }
        if (token) {
            fetchtracks();
        }
    }, [token]);



    return (
        <div className="contenedor ">
            <Link to="/" className="btn rounded-full menu-rounded btn-primary mt-9">
                <i class="fa-solid fa-house-user fa-3x"></i>
            </Link>
            {track &&
                <div className="card lg:card-side bg-base-100 shadow-xl mt-36">
                    <figure><img src={track.album?.images[1].url} alt={track.name} /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{track.name}</h2>
                        <p>Artista: {track?.artists && track?.artists[0].name} </p>
                        <p>Duracion: {(track?.duration_ms / 60000).toFixed(2).replace(".", ":")} min </p>
                        <p>Popularidad Obtenida: {track?.popularity}% </p>
                        <p>Cancion Explicita: {track?.explicit ? "Si" : "No"} </p>
                        <i id={track.id} className={`${isFavorite(track.id) ? 'fa-solid' : "fa-regular"} fa-heart fa-2x cursor-pointer mt-3`} onClick={() => saveFavorites(track)} ></i>

                        {track.preview_url &&
                            <div className="card-actions justify-end mt-6 md:mt-0">
                                <audio controls >
                                    <source src={track.preview_url} type="audio/mp3" />
                                </audio>
                            </div>
                        }

                    </div>
                </div>
            }

        </div>

    )

}

export default Track;