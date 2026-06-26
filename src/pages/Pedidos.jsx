import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { 
    SearchIcon, 
    EditIcon, 
    TrashIcon, 
    PlusIcon, 
    CheckCircleIcon, 
    AlertCircleIcon,
    DashboardIcon
} from "../components/Icons";

const MOCK_PEDIDOS = [
    { descripcion: "Compra de servidores Dell PowerEdge R750" },
    { descripcion: "Licencias corporativas de Microsoft Office 365" },
    { descripcion: "Equipos de red Switch Cisco Catalyst 9300" },
    { descripcion: "Servicios de consultoría Cloud AWS (100 horas)" }
];

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [nuevoPedido, setNuevoPedido] = useState("");
    const [editando, setEditando] = useState(null);
    const [filtro, setFiltro] = useState("");
    
    // Estados de Alertas/Toast
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const cargarPedidos = () => {
        api.get("/pedidos")
            .then((response) => {
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setPedidos(response.data);
                } else {
                    cargarDeLocalStorage();
                }
            })
            .catch((error) => {
                console.warn("API de Pedidos no disponible, utilizando modo Demo Offline (LocalStorage).");
                showToast("Conexión con API fallida. Activando modo Demo Offline.", "warning");
                cargarDeLocalStorage();
            });
    };

    const cargarDeLocalStorage = () => {
        const guardados = localStorage.getItem("cordillera_pedidos");
        if (guardados) {
            setPedidos(JSON.parse(guardados));
        } else {
            setPedidos(MOCK_PEDIDOS);
            localStorage.setItem("cordillera_pedidos", JSON.stringify(MOCK_PEDIDOS));
        }
    };

    const guardarEnLocalStorage = (nuevaLista) => {
        localStorage.setItem("cordillera_pedidos", JSON.stringify(nuevaLista));
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    const guardarPedido = () => {
        if (!nuevoPedido.trim()) {
            showToast("Por favor, ingrese la descripción del pedido.", "error");
            return;
        }

        let copia = [...pedidos];

        if (editando !== null) {
            copia[editando] = {
                ...copia[editando],
                descripcion: nuevoPedido
            };
            setPedidos(copia);
            setEditando(null);
            showToast("Pedido actualizado con éxito.", "success");
        } else {
            const pedido = {
                descripcion: nuevoPedido
            };
            copia = [...pedidos, pedido];
            setPedidos(copia);
            showToast("Pedido registrado con éxito.", "success");
        }

        guardarEnLocalStorage(copia);
        setNuevoPedido("");
    };

    const editarPedido = (index) => {
        const descripcion = pedidos[index].descripcion || pedidos[index].nombre || "";
        setNuevoPedido(descripcion);
        setEditando(index);
    };

    const eliminarPedido = (index) => {
        const copia = [...pedidos];
        copia.splice(index, 1);
        setPedidos(copia);
        guardarEnLocalStorage(copia);
        showToast("Pedido eliminado correctamente.", "success");
        
        if (editando === index) {
            setEditando(null);
            setNuevoPedido("");
        }
    };

    // Filtrar lista por búsqueda en tiempo real
    const pedidosFiltrados = pedidos.filter((pedido) => {
        const desc = (pedido.descripcion || pedido.nombre || "").toLowerCase();
        return desc.includes(filtro.toLowerCase());
    });

    return (
        <div>
            {/* Barra de Navegación */}
            <div className="nav-bar">
                <div className="nav-brand">
                    <span>Grupo Cordillera</span>
                </div>
                <div className="nav-user">
                    <span className="user-tag">Módulo: Pedidos</span>
                    <Link to="/home" className="back-link">
                        <DashboardIcon size={16} />
                        <span>Dashboard</span>
                    </Link>
                </div>
            </div>

            {/* Contenedor Principal */}
            <div className="container">
                <div style={{ marginBottom: "25px" }}>
                    <Link to="/home" className="back-link" style={{ marginBottom: "15px" }}>
                        &larr; Volver al Panel
                    </Link>
                    <h1 style={{ fontFamily: "var(--font-family-title)", fontSize: "2rem", fontWeight: "700", marginTop: "10px" }}>
                        Gestión de Pedidos
                    </h1>
                </div>

                <div className="pedidos-layout">
                    {/* Columna Izquierda: Formulario */}
                    <div className="glass-panel" style={{ height: "fit-content" }}>
                        <h2>
                            {editando !== null ? "Editar Pedido" : "Nuevo Pedido"}
                        </h2>
                        
                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", alignSelf: "flex-start" }}>
                                Descripción del Pedido
                            </label>
                            <input
                                type="text"
                                placeholder="Ej: Compra de laptops corporativas"
                                value={nuevoPedido}
                                onChange={(e) => setNuevoPedido(e.target.value)}
                                style={{ paddingLeft: "16px" }}
                            />
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <button onClick={guardarPedido} style={{ flexGrow: 1 }}>
                                {editando !== null ? (
                                    <span>Actualizar Pedido</span>
                                ) : (
                                    <>
                                        <PlusIcon size={16} />
                                        <span>Crear Pedido</span>
                                    </>
                                )}
                            </button>
                            {editando !== null && (
                                <button 
                                    className="btn-secondary" 
                                    onClick={() => {
                                        setEditando(null);
                                        setNuevoPedido("");
                                    }}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Columna Derecha: Tabla */}
                    <div className="glass-panel">
                        <div className="section-actions">
                            <h2 style={{ marginBottom: 0 }}>
                                Lista de Pedidos
                            </h2>
                            <div className="search-container">
                                <SearchIcon className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Buscar pedido..."
                                    value={filtro}
                                    onChange={(e) => setFiltro(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>#</th>
                                        <th>Descripción del Pedido</th>
                                        <th style={{ width: "30%", textAlign: "center" }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidosFiltrados.length > 0 ? (
                                        pedidosFiltrados.map((pedido, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td style={{ fontWeight: "500" }}>
                                                    {pedido.descripcion || pedido.nombre || JSON.stringify(pedido)}
                                                </td>
                                                <td>
                                                    <div className="action-buttons" style={{ justifyContent: "center" }}>
                                                        <button
                                                            className="btn-edit"
                                                            onClick={() => editarPedido(index)}
                                                            title="Editar pedido"
                                                        >
                                                            <EditIcon size={14} />
                                                            <span>Editar</span>
                                                        </button>
                                                        <button
                                                            className="btn-delete"
                                                            onClick={() => eliminarPedido(index)}
                                                            title="Eliminar pedido"
                                                        >
                                                            <TrashIcon size={14} />
                                                            <span>Eliminar</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                                                {filtro ? "No se encontraron pedidos coincidentes." : "No hay pedidos registrados."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toasts de Notificación */}
            {toast && (
                <div className="toast-container">
                    <div className={`toast toast-${toast.type}`}>
                        {toast.type === "success" && <CheckCircleIcon className="toast-icon" />}
                        {toast.type === "error" && <AlertCircleIcon className="toast-icon" />}
                        {toast.type === "warning" && <AlertCircleIcon className="toast-icon" />}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pedidos;