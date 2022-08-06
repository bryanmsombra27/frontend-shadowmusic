

const Login = () => {

    return (

        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-96 h-96 bg-slate-700 rounded-3xl flex flex-col justify-center items-center">
                    <h1 className="m-9 text-center font-bold text-3xl">Inicia Sesión con tu cuenta de Spotify</h1>
                    <a href="http://localhost:4000/api/code" >
                        <img className="w-40 h-40" src="https://cdn.icon-icons.com/icons2/836/PNG/512/Spotify_icon-icons.com_66783.png" alt="" />

                    </a>
                </div>
            </div>

        </>

    )

}

export default Login;