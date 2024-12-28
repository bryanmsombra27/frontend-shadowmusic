import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Tracks = ({ token, tracks, settracks, settracksCopy }) => {
  const navigate = useNavigate();
  const [isFavObject, setIsfavObject] = useState({
    id: "",
    isFavorite: false
  });


  const isFavorite = (id) => {
    const favoritos = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

    const isFavorite = !!favoritos.find(fav => fav.id == id)


    return isFavorite;

  }





  const saveFavorites = (id) => {
    const heartIcon = document.getElementById(id);


    heartIcon.classList.remove("fa-regular")
    heartIcon.classList.add("fa-solid")


    const favoritos = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

    const favoriteSong = tracks.find((track) => track.id == id);


    const alreadyFavorite = favoritos.find(song => song.id == id);


    if (
      !alreadyFavorite) {
      favoritos.push(favoriteSong)

    }
    localStorage.setItem("favorites", JSON.stringify(favoritos));
  }

  useEffect(() => {
    const fetchtracks = async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/tracks/?ids=3cdmLOVYY9vht4a1THRJcZ,71qB68guEJjbvtjlkZ8DF5,58zsLZPvfflaiIbNWoA22O,5kqIPrATaCc2LqxVWzQGbk,27NaNvlmvOHqTF0VPjuRSD,1O73ZKgl0THUImkHW6dfAL,4NmOJQxl9UZItUQQtMDYBb,7D1iGhQakEW8oFCfWBlRek,10xV5l9nhLvFpR8mqzs0bL,08w1hnWW4GhVm61DoVojsY,3TKpJrY9q49Mj1JOsM9zGL,3OFnCTyDRIbv4WDRFotvMG", {
          headers: {
            "Authorization": `Bearer  ${token}`
          }
        })
        const data = await res.json();

        settracks(data.tracks);
        settracksCopy(data.tracks)

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
    <>

      {
        tracks.length > 0 && tracks.map((track) =>
          <div className="card md:w-96 bg-base-100 shadow-xl mx-auto" key={track.id}>
            <figure><img src={track.album.images[0].url} alt={track.name} /></figure>
            <div className="card-body">
              <h2 className="card-title">{track.name}</h2>
              <p>Artista: {track.artists[0].name}</p>
              <div className="card-actions justify-between mt-3">
                <i id={`${track.id}`} className={`${isFavorite(track.id) ? 'fa-solid' : 'fa-regular'}  fa-heart fa-2x cursor-pointer mt-3  `} onClick={() => saveFavorites(track.id)} ></i>
                <Link className="btn btn-primary" to={`/track/${track.id}`} >Ver mas</Link>
              </div>
            </div>
          </div>
        )
      }

    </>

  )

}

export default Tracks;