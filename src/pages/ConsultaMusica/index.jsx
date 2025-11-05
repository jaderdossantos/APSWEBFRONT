import { useState, useRef } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function ConsultaMusica() {
  const navigate = useNavigate();
  const [nomeBusca, setNomeBusca] = useState("");
  const [musicas, setMusicas] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [editarMusica, setEditarMusica] = useState(null);

  const inputNome = useRef();
  const inputArtista = useRef();

  // Buscar músicas pelo nome
  async function buscarMusica() {
    if (!nomeBusca) {
      setMensagem("Informe um nome para buscar.");
      setMusicas([]);
      return;
    }

    try {
      const resposta = await api.get(`/musicas?nome=${nomeBusca}`);
      setMusicas(resposta.data);
      setMensagem("");
      setEditarMusica(null);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setMensagem("Música não encontrada.");
      } else {
        setMensagem("Erro ao buscar música.");
      }
      setMusicas([]);
    }
  }

  // Salvar edição
  async function salvarEdicao() {
    const novoNome = inputNome.current.value.trim();
    const novoArtista = inputArtista.current.value.trim();

    if (!novoNome || !novoArtista) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      await api.put(`/musicas/${editarMusica.id}`, {
        nome: novoNome,
        artista: novoArtista,
      });

      setMusicas((prev) =>
        prev.map((m) =>
          m.id === editarMusica.id
            ? { ...m, nome: novoNome, artista: novoArtista }
            : m
        )
      );

      setMensagem("Música atualizada com sucesso!");
      setEditarMusica(null);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao editar música.");
    }
  }

  // Deletar música
  async function deletarMusica(id) {
    try {
      await api.delete(`/musicas/${id}`);
      setMusicas((prev) => prev.filter((m) => m.id !== id));
      setMensagem("Música deletada com sucesso!");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao deletar música.");
    }
  }

  return (
    <div className="container">
      <h1>Consulta de Músicas</h1>

      {/* Campo de busca */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Digite o nome da música"
          value={nomeBusca}
          onChange={(e) => setNomeBusca(e.target.value)}
        />
        <button onClick={buscarMusica}>Buscar</button>
      </div>

      {/* Mensagem */}
      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>}

      {/* Botão de cadastro */}
      <div>
        <button onClick={() => navigate("/cadastro-musica")}>
          Cadastrar nova Música
        </button>
        <button onClick={() => navigate("/consulta")}>
          Voltar ao Menu
        </button>
      </div>

      {/* Lista de músicas */}
      {musicas.length > 0 && (
        <div className="cartoes">
          {musicas.map((m) => (
            <div key={m.id} className="cartao">
              {editarMusica?.id === m.id ? (
                <>
                  <input
                    defaultValue={m.nome}
                    ref={inputNome}
                    placeholder="Nome"
                  />
                  <input
                    defaultValue={m.artista}
                    ref={inputArtista}
                    placeholder="Artista"
                  />
                  <button onClick={salvarEdicao}>Salvar</button>
                  <button onClick={() => setEditarMusica(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <p>
                    <strong>Nome:</strong> {m.nome}
                  </p>
                  <p>
                    <strong>Artista:</strong> {m.artista}
                  </p>
                  <button onClick={() => setEditarMusica(m)}>Editar</button>
                  <button onClick={() => deletarMusica(m.id)}>Deletar</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConsultaMusica;
