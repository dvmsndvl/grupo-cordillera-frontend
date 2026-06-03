import { useEffect, useState } from "react";
import api from "../services/api";

function Pedidos() {

    const [pedidos, setPedidos] = useState([]);
    const [nuevoPedido, setNuevoPedido] = useState("");
    const [editando, setEditando] = useState(null);

    const cargarPedidos = () => {
        api.get("/pedidos")
            .then((response) => {
                setPedidos(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    const guardarPedido = () => {

        if (!nuevoPedido.trim()) {
            alert("Ingrese un pedido");
            return;
        }

        if (editando !== null) {

            const copia = [...pedidos];

            copia[editando] = {
                ...copia[editando],
                descripcion: nuevoPedido
            };

            setPedidos(copia);
            setEditando(null);

        } else {

            const pedido = {
                descripcion: nuevoPedido
            };

            setPedidos([...pedidos, pedido]);
        }

        setNuevoPedido("");
    };

    const editarPedido = (index) => {

        const descripcion =
            pedidos[index].descripcion ||
            pedidos[index].nombre ||
            "";

        setNuevoPedido(descripcion);
        setEditando(index);
    };

    const eliminarPedido = (index) => {

        const copia = [...pedidos];
        copia.splice(index, 1);
        setPedidos(copia);
    };

    return (
        <div>

            <div className="header">
                <h1>Grupo Cordillera</h1>
                <p>Módulo de Gestión de Pedidos</p>
            </div>

            <div className="container">

                <h2>
                    {editando !== null
                        ? "Editar Pedido"
                        : "Nuevo Pedido"}
                </h2>

                <input
                    type="text"
                    placeholder="Descripción del pedido"
                    value={nuevoPedido}
                    onChange={(e) => setNuevoPedido(e.target.value)}
                />

                <button onClick={guardarPedido}>
                    {editando !== null
                        ? "Actualizar Pedido"
                        : "Crear Pedido"}
                </button>

                <hr />

                <h2>Lista de Pedidos</h2>

                <table>

                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Pedido</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>

                    <tbody>

                    {pedidos.map((pedido, index) => (

                        <tr key={index}>

                            <td>{index + 1}</td>

                            <td>
                                {pedido.descripcion ||
                                    pedido.nombre ||
                                    JSON.stringify(pedido)}
                            </td>

                            <td>

                                <button
                                    onClick={() => editarPedido(index)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn-delete"
                                    onClick={() => eliminarPedido(index)}
                                >
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Pedidos;