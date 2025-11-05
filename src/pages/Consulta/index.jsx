import { useState, useRef } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Consulta() {
  const navigate = useNavigate();
  const [emailBusca, setEmailBusca] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [editarUsuario, setEditarUsuario] = useState(false);

  const inputNome = useRef();
  const inputEmail = useRef();
  const inputSenha = useRef();

  // Buscar usuário pelo e-mail
  async function buscarUsuario() {
    if (!emailBusca) {
      setMensagem("Informe um e-mail para buscar.");
      setUsuario(null);
      return;
    }

    try {
      const resposta = await api.get(`/usuarios?email=${emailBusca}`);
      setUsuario(resposta.data);
      setMensagem("");
      setEditarUsuario(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setMensagem("Usuário não encontrado.");
      } else {
        setMensagem("Erro ao buscar usuário.");
      }
      setUsuario(null);
    }
  }

  // Editar usuário
  async function salvarEdicao() {
    const nome = inputNome.current.value.trim();
    const email = inputEmail.current.value.trim();
    const senha = inputSenha.current.value.trim();

    if (!nome || !email || !senha) {
      setMensagem("Preencha todos os campos para editar!");
      return;
    }

    try {
      await api.put(`/usuarios/${usuario.id}`, { nome, email, senha });
      setUsuario({ ...usuario, nome, email }); // atualiza localmente
      setEditarUsuario(false);
      setMensagem("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao editar usuário.");
    }
  }

  // Deletar usuário
  async function deletarUsuario() {
    try {
      await api.delete(`/usuarios/${usuario.id}`);
      setUsuario(null);
      setMensagem("Usuário deletado com sucesso!");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao deletar usuário.");
    }
  }

  return (
    <div className="container">
      <h1>Consulta de Usuário</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Digite o e-mail do usuário"
          value={emailBusca}
          onChange={(e) => setEmailBusca(e.target.value)}
        />
        <button onClick={buscarUsuario}>Buscar</button>
      </div>

      {mensagem && <p style={{ color: "red" }}>{mensagem}</p>}

      {usuario && (
        <div className="cartao">
          {editarUsuario ? (
            <>
              <input
                defaultValue={usuario.nome}
                ref={inputNome}
                placeholder="Nome"
              />
              <input
                defaultValue={usuario.email}
                ref={inputEmail}
                placeholder="E-mail"
              />
              <input type="password" ref={inputSenha} placeholder="Senha" />
              <button onClick={salvarEdicao}>Salvar</button>
              <button onClick={() => setEditarUsuario(false)}>Cancelar</button>
            </>
          ) : (
            <>
              <p>
                <strong>Nome:</strong> {usuario.nome}
              </p>
              <p>
                <strong>E-mail:</strong> {usuario.email}
              </p>
              <button onClick={() => setEditarUsuario(true)}>Editar</button>
              <button onClick={deletarUsuario}>Deletar</button>
            </>
          )}
        </div>
      )}

      <div>
        <button onClick={() => navigate("/cadastro-manga")}>
          Cadastrar Mangá
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/cadastro-musica")}>
          Cadastrar Música
        </button>
      </div>
    </div>
  );
}

export default Consulta;
