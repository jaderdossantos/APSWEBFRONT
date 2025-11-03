import { useRef, useState } from "react";
import api from "../../services/api"; // o mesmo axios que você usa nas outras páginas
import { useNavigate } from "react-router-dom";

function Login() {
  const inputEmail = useRef();
  const inputSenha = useRef();
  const navigate = useNavigate();

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    const email = inputEmail.current.value.trim();
    const senha = inputSenha.current.value.trim();

    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      setCarregando(true);
      setErro("");

      // Envia para o backend
      const resposta = await api.post("/login", { email, senha });

      alert(resposta.data.message); // "Login bem-sucedido!"
      
      // Armazena o usuário logado (sem senha)
      localStorage.setItem("usuario", JSON.stringify(resposta.data.usuario));

      // Redireciona para a página de visualização
      navigate("/consulta");
    } catch (error) {
      if (error.response?.status === 401) {
        setErro("Email ou senha incorretos!");
      } else {
        setErro("Erro no servidor. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <input type="email" placeholder="E-mail" ref={inputEmail} />
      <input type="password" placeholder="Senha" ref={inputSenha} />
      <button onClick={handleLogin} disabled={carregando}>
        {carregando ? "Entrando..." : "Entrar"}
      </button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <button onClick={() => navigate("/cadastro")}>
        Cadastrar novo usuário
      </button>
    </div>
  );
}

export default Login;