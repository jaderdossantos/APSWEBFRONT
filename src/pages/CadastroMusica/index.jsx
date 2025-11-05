import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CadastroMusica() {
  const [mensagem, setMensagem] = useState("");
  const inputNome = useRef();
  const inputArtista = useRef();
  const navigate = useNavigate();

  async function createMusica() {
    const nome = inputNome.current.value.trim();
    const artista = inputArtista.current.value.trim();
    

    if (!nome || !artista ) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/musicas", { nome, artista });
      setMensagem("Música cadastrada com sucesso!");

      
      inputNome.current.value = "";
      inputArtista.current.value = "";
     
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar a Música.");
    }
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Músicas</h1>
        <input placeholder="Nome da Música" type="text" ref={inputNome} />
        <input placeholder="Artista" type="text" ref={inputArtista} />
        <button type="button" onClick={createMusica}>
          Cadastrar Música
        </button>
        {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      </form>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/consulta-musica")}>
          Consultar Músicas
        </button>
        <button onClick={() => navigate("/consulta")}>
          Voltar ao Menu
        </button>
      </div>
    </div>
  );
}

export default CadastroMusica;