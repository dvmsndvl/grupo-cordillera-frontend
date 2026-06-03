import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (usuario === "admin" && password === "1234") {
            navigate("/home");
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div>

            <div className="header">
                <h1>Grupo Cordillera</h1>
                <p>Plataforma de monitoreo inteligente</p>
            </div>

            <div className="login-box">

                <h2>Iniciar Sesión</h2>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Ingresar
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;