import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, LockIcon, AlertCircleIcon } from "../components/Icons";

function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!usuario.trim() || !password.trim()) {
            setError("Por favor, ingrese todos los campos.");
            return;
        }

        setLoading(true);

        // Simulamos un retraso de conexión para mejorar la UX (animación del botón)
        setTimeout(() => {
            if (usuario === "admin" && password === "1234") {
                navigate("/home");
            } else {
                setError("Usuario o contraseña incorrectos.");
                setLoading(false);
            }
        }, 850);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Grupo Cordillera</h2>
                <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "30px", fontSize: "0.9rem" }}>
                    Plataforma de monitoreo inteligente
                </p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", alignSelf: "flex-start" }}>
                            Usuario
                        </label>
                        <div className="input-container">
                            <UserIcon className="input-icon" />
                            <input
                                type="text"
                                placeholder="Usuario (admin)"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: "10px" }}>
                        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", alignSelf: "flex-start" }}>
                            Contraseña
                        </label>
                        <div className="input-container">
                            <LockIcon className="input-icon" />
                            <input
                                type="password"
                                placeholder="Contraseña (1234)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>

                {error && (
                    <div className="toast-container">
                        <div className="toast toast-error">
                            <AlertCircleIcon className="toast-icon" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;