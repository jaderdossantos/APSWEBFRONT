import React from "react";

function CartaoUsuario({ usuario, onDelete, mostrarEditar, onEditar }) {
  return (
    <div className="cartao">
      <div>
        <p>Nome: <span>{usuario.nome}</span></p>
        <p>Email: <span>{usuario.email}</span></p>
      </div>

      {mostrarEditar && onEditar && (
        <button onClick={onEditar}>Editar</button>
      )}

      {onDelete && (
        <button onClick={() => onDelete(usuario.id)}>
          Deletar
        </button>
      )}
    </div>
  );
}

export default CartaoUsuario;