import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function CadastroManga() {
  const [mensagem, setMensagem] = useState("");
  const inputManga = useRef();
  const inputCapitulo = useRef();
  const navigate = useNavigate();

  async function createMangas() {
    const manga = inputManga.current.value.trim();
    const capitulo = parseInt(inputCapitulo.current.value);
    

    if (!manga || !capitulo ) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/mangas", { manga, capitulo });
      setMensagem("Mangá cadastrado com sucesso!");

      
      inputManga.current.value = "";
      inputCapitulo.current.value = "";
     
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar o Mangá.");
    }
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Mangás</h1>
        <input placeholder="Nome" type="text" ref={inputManga} />
        <input placeholder="Capítulo" type="Number" ref={inputCapitulo} />
        <button type="button" onClick={createMangas}>
          Cadastrar Mangá
        </button>
        {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      </form>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/consulta-manga")}>
          Consultar Mangás
        </button>
        <button onClick={() => navigate("/consulta")}>
          Voltar ao Menu
        </button>
      </div>
    </div>
  );
}

export default CadastroManga;