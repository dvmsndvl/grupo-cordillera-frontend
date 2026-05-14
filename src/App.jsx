
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from "./pages/Home";
import api from "./services/api";
import { useEffect, useState } from "react";


function App() {

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    api.get("/")
      .then((response) => {
        setMensaje(response.data);
      })
      .catch((error) => {
        console.log(error);
        setMensaje("Error conectando con el BFF");
      });
  }, []);

  return (
    <div>
      <h1>Grupo Cordillera</h1>
      <p>{mensaje}</p>
    </div>
  );
}

export default App;