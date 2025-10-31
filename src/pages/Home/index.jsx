import { useState, useEffect, useRef } from "react";
import "./style.css";
import Lixo from "../../assets/lixo.svg";
import api from "../../services/api";

function Home() {
  const [usuarios, setUsuarios] = useState([]);

  const inputNome = useRef();
  const inputIdade = useRef();
  const inputEmail = useRef();

  async function getUsuarios() {
    const usuariosApi = await api.get("/usuarios");

    setUsuarios(usuariosApi.data);
  }

  async function createUsuarios() {
    await api.post("/usuarios", {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value,
    });
    getUsuarios();
  }

  async function deleteUsuarios(id) {
    await api.delete(`usuarios/${id}`)
    getUsuarios();
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputNome} />
        <input
          placeholder="Idade"
          name="idade"
          type="number"
          ref={inputIdade}
        />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsuarios}>
          Cadastrar
        </button>
      </form>
      {usuarios.map((usuario) => (
        <div key={usuario.id} className="cartao">
          <div>
            <p>
              Nome: <span> {usuario.nome}</span>{" "}
            </p>
            <p>
              Idade: <span>{usuario.idade}</span>{" "}
            </p>
            <p>
              Email:<span> {usuario.email}</span>{" "}
            </p>
          </div>
          <button onClick={() => deleteUsuarios(usuario.id)}>
            <img src={Lixo} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
