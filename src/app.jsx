import { Routes, Route } from "react-router-dom";
import Consulta from "./pages/Consulta";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastroManga from "./pages/CadastroManga";
import ConsultaManga from "./pages/ConsultaManga";
import CadastroMusica from "./pages/CadastroMusica";
import ConsultaMusica from "./pages/ConsultaMusica";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/consulta" element={<Consulta />} />
      <Route path="/cadastro-manga" element={<CadastroManga />} />
      <Route path="/consulta-manga" element={<ConsultaManga />} />
      <Route path="/cadastro-musica" element={<CadastroMusica />} />
      <Route path="/consulta-musica" element={<ConsultaMusica />} />
    </Routes>
  );
}

export default App;
