import { Link } from "react-router-dom";
import { 
    OrdersIcon, 
    InventoryIcon, 
    ServerIcon, 
    LogOutIcon, 
    LockIcon 
} from "../components/Icons";

function Home() {
    return (
        <div>
            {/* Barra de Navegación Superior */}
            <div className="nav-bar">
                <div className="nav-brand">
                    <span>Grupo Cordillera</span>
                </div>
                <div className="nav-user">
                    <span className="user-tag">Usuario: admin</span>
                    <Link to="/" className="back-link">
                        <LogOutIcon size={16} />
                        <span>Cerrar Sesión</span>
                    </Link>
                </div>
            </div>

            {/* Contenedor Principal */}
            <div className="container">
                <div style={{ marginBottom: "35px" }}>
                    <h2 style={{ fontFamily: "var(--font-family-title)", fontSize: "2rem", fontWeight: "700" }}>
                        Monitoreo Organizacional
                    </h2>
                    <p style={{ color: "var(--text-secondary)", marginTop: "5px" }}>
                        Seleccione el módulo al que desea ingresar para visualizar y gestionar la información.
                    </p>
                </div>

                {/* Grid de Módulos */}
                <div className="dashboard-grid">
                    {/* Módulo Pedidos */}
                    <div className="card">
                        <span className="badge badge-active">Activo</span>
                        <div className="card-icon">
                            <OrdersIcon size={26} />
                        </div>
                        <h3>Gestión de Pedidos</h3>
                        <p>
                            Monitoreo y administración en tiempo real de los pedidos registrados. Registre nuevos pedidos, edite descripciones y gestione estados.
                        </p>
                        <Link to="/pedidos" style={{ textDecoration: "none", width: "100%" }}>
                            <button style={{ width: "100%" }}>
                                Gestionar Pedidos
                            </button>
                        </Link>
                    </div>

                    {/* Módulo Inventario (Bloqueado) */}
                    <div className="card locked">
                        <span className="badge badge-locked" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <LockIcon size={12} />
                            <span>Próximamente</span>
                        </span>
                        <div className="card-icon">
                            <InventoryIcon size={26} />
                        </div>
                        <h3>Gestión de Inventario</h3>
                        <p>
                            Administración y control de stock de bodega, productos y proveedores. Este microservicio se encuentra actualmente en preparación.
                        </p>
                        <button className="btn-secondary" style={{ width: "100%", cursor: "not-allowed" }} disabled>
                            Módulo Bloqueado
                        </button>
                    </div>
                </div>

                {/* Widget de Estado de Microservicios */}
                <div className="status-widget">
                    <h3>
                        <ServerIcon size={18} style={{ color: "var(--primary)" }} />
                        <span>Estado de Servicios (BFF / Microservicios)</span>
                    </h3>
                    <div className="status-list">
                        <div className="status-item">
                            <span className="status-label">BFF Gateway</span>
                            <div className="status-indicator">
                                <span className="dot dot-green"></span>
                                <span style={{ color: "var(--success)" }}>Activo</span>
                            </div>
                        </div>
                        <div className="status-item">
                            <span className="status-label">Servicio Pedidos</span>
                            <div className="status-indicator">
                                <span className="dot dot-green"></span>
                                <span style={{ color: "var(--success)" }}>Activo</span>
                            </div>
                        </div>
                        <div className="status-item">
                            <span className="status-label">Servicio Inventario</span>
                            <div className="status-indicator">
                                <span className="dot" style={{ backgroundColor: "var(--warning)", boxShadow: "0 0 8px var(--warning)" }}></span>
                                <span style={{ color: "var(--warning)" }}>Desconectado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;