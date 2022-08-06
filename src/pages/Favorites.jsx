import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Track from "./Track";

const Favorites = () => {
  let favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
  const [favoritos, setfavoritos] = useState(favorites);


  const removeFavorites = (id) => {
    favorites = favorites.flat().filter(f => f.id !== id);
    setfavoritos(favorites)
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return (
    <div className="contenedor">
      <Link to="/" className="btn rounded-full menu-rounded btn-primary my-9 ">
        <i className="fa-solid fa-house-user fa-3x"></i>
      </Link>

      {favoritos.flat().map(favorite =>

        <div className="card lg:card-side bg-base-100 shadow-xl contenedor gap-9 mt-9 " key={favorite.id}>
          <figure><img src={favorite.album && favorite.album?.images[0].url} alt="Album" className="w-40 h-40" /></figure>
          <div className="card-body">
            <h2 className="card-title">{favorite.name}</h2>
            <p>Artista: {favorite?.artists && favorite?.artists[0].name} </p>
            <div className="card-actions justify-end">
              <Link className="btn btn-primary" to={`/track/${favorite.id}`} >Escuchar Musica</Link>
            </div>
          </div>
          <i className="fa-solid fa-rectangle-xmark fa-3x cursor-pointer text-red-600 " onClick={() => removeFavorites(favorite.id)} ></i>
        </div>
      )}
    </div>


  )

}

export default Favorites;