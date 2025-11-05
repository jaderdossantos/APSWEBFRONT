import { useState, useRef } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function ConsultaManga() {
  const navigate = useNavigate();
  const [mangaBusca, setMangaBusca] = useState("");
  const [mangas, setMangas] = useState([]); // agora é um array
  const [mensagem, setMensagem] = useState("");
  const [editarManga, setEditarManga] = useState(null); // guarda o mangá em edição

  const inputManga = useRef();
  const inputCapitulo = useRef();

  // Buscar mangás pelo nome
  async function buscarManga() {
    if (!mangaBusca) {
      setMensagem("Informe um nome de mangá para buscar.");
      setMangas([]);
      return;
    }

    try {
      const resposta = await api.get(`/mangas?manga=${mangaBusca}`);
      setMangas(resposta.data);
      setMensagem("");
      setEditarManga(null);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setMensagem("Mangá não encontrado.");
      } else {
        setMensagem("Erro ao buscar mangá.");
      }
      setMangas([]);
    }
  }

  // Salvar edição
  async function salvarEdicao() {
    const novoNome = inputManga.current.value.trim();
    const novoCapitulo = parseInt(inputCapitulo.current.value);

    if (!novoNome || !novoCapitulo) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      await api.put(`/mangas/${editarManga.id}`, {
        manga: novoNome,
        capitulo: novoCapitulo,
      });

      setMangas((prev) =>
        prev.map((m) =>
          m.id === editarManga.id
            ? { ...m, manga: novoNome, capitulo: novoCapitulo }
            : m
        )
      );

      setMensagem("Mangá atualizado com sucesso!");
      setEditarManga(null);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao editar mangá.");
    }
  }

  // Deletar mangá
  async function deletarManga(id) {
    try {
      await api.delete(`/mangas/${id}`);
      setMangas((prev) => prev.filter((m) => m.id !== id));
      setMensagem("Mangá deletado com sucesso!");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao deletar mangá.");
    }
  }

  return (
    <div className="container">
      <h1>Consulta de Mangás</h1>

      {/* Campo de busca */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Digite o nome do mangá"
          value={mangaBusca}
          onChange={(e) => setMangaBusca(e.target.value)}
        />
        <button onClick={buscarManga}>Buscar</button>
      </div>

      {/* Mensagem de erro ou sucesso */}
      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>}

      {/* Botão para ir à tela de cadastro */}
      <div>
        <button onClick={() => navigate("/cadastro-manga")}>
          Cadastrar novo Mangá
        </button>
        <button onClick={() => navigate("/consulta")}>
          Voltar ao Menu
        </button>
      </div>

      {/* Exibição dos resultados */}
      {mangas.length > 0 && (
        <div className="cartoes">
          {mangas.map((m) => (
            <div key={m.id} className="cartao">
              {editarManga?.id === m.id ? (
                <>
                  <input
                    defaultValue={m.manga}
                    ref={inputManga}
                    placeholder="Nome"
                  />
                  <input
                    defaultValue={m.capitulo}
                    ref={inputCapitulo}
                    placeholder="Capítulo"
                    type="number"
                  />
                  <button onClick={salvarEdicao}>Salvar</button>
                  <button onClick={() => setEditarManga(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <p>
                    <strong>Nome:</strong> {m.manga}
                  </p>
                  <p>
                    <strong>Capítulo:</strong> {m.capitulo}
                  </p>
                  <button onClick={() => setEditarManga(m)}>Editar</button>
                  <button onClick={() => deletarManga(m.id)}>Deletar</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConsultaManga;
