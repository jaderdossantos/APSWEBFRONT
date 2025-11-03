import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Cadastro() {
  const [mensagem, setMensagem] = useState("");
  const inputNome = useRef();
  const inputEmail = useRef();
  const inputSenha = useRef();
  const navigate = useNavigate();

  async function createUsuarios() {
    const nome = inputNome.current.value.trim();
    const email = inputEmail.current.value.trim();
    const senha = inputSenha.current.value.trim();

    if (!nome || !email || !senha) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/usuarios", { nome, email, senha });
      setMensagem("Usuário cadastrado com sucesso!");

      // Limpa campos
      inputNome.current.value = "";
      inputEmail.current.value = "";
      inputSenha.current.value = "";
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar usuário.");
    }
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" type="text" ref={inputNome} />
        <input placeholder="E-mail" type="email" ref={inputEmail} />
        <input placeholder="Senha" type="password" ref={inputSenha} />
        <button type="button" onClick={createUsuarios}>
          Cadastrar
        </button>
        {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      </form>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/")}>
          Voltar para o Login
        </button>
      </div>
    </div>
  );
}

export default Cadastro;