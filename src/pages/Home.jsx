import { Link } from "react-router-dom";

function Home() {

    return (
        <div>

            <div className="header">
                <h1>Grupo Cordillera</h1>
                <p>
                    Plataforma de monitoreo inteligente para el desempeño organizacional
                </p>
            </div>

            <div className="container">

                <h2>Módulos Disponibles</h2>

                <p>
                    Acceda a los distintos módulos del sistema.
                </p>

                <Link to="/pedidos">
                    <button>
                        Gestión de Pedidos
                    </button>
                </Link>

            </div>

        </div>
    );
}

export default Home;