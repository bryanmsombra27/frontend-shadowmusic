import { useState } from "react";

const Search = ({ tracks, settracks, tracksCopy }) => {
    const [search, setSearch] = useState("");


    const onChange = (e) => {
        setSearch(e.target.value.toLowerCase());

        if (search.length == 0 || search.length == 1) {
            settracks(tracksCopy)
            return;
        }

        if (search !== "") {
            const searchResults = tracks.filter((track) => track.name.toLowerCase().includes(search) || track.artists[0].name.toLowerCase().includes(search));

            settracks(searchResults);


        }
        if (tracks.length == 0) {
            settracks(tracksCopy)
        }


    }


    return (

        <input type="text" placeholder="busqueda por cancion o artista" className="input input-bordered input-secondary w-full max-w-xs" onChange={onChange} value={search} />

    )

}

export default Search;