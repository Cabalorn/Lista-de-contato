const formContato = document.getElementById("form-contato");
const listaContatos = document.getElementById("lista-contatos");

let contatos = [];

formContato.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  const novoContato = {
    nome,
    email,
    telefone,
  };

  contatos.push(novoContato);

  mostrarMensagem(`Contato "${nome}" adicionado!`);
  mostrarContatos();
});

function mostrarMensagem(mensagem) {
  const divMensagem = document.createElement("div");
  divMensagem.classList.add("mensagem");
  divMensagem.innerText = mensagem;

  document.body.insertBefore(divMensagem, formContato);

  setTimeout(() => {
    divMensagem.remove();
  }, 3000);
}

function renderContact(contact, tr) {
  const editButton = document.createElement("button");
  editButton.innerText = "Editar";
  editButton.addEventListener("click", () => {
    const nome = prompt("Digite o novo nome:", contact.nome);
    const email = prompt("Digite o novo email:", contact.email);
    const telefone = prompt("Digite o novo telefone:", contact.telefone);

    contact.nome = nome;
    contact.email = email;
    contact.telefone = telefone;

    mostrarMensagem(`Contato "${nome}" editado!`);
    mostrarContatos();
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Excluir";
  deleteButton.addEventListener("click", () => {
    const index = contatos.indexOf(contact);
    contatos.splice(index, 1);
    mostrarMensagem(`Contato "${contact.nome}" excluído!`);
    mostrarContatos();
  });

  const tdNome = document.createElement("td");
  tdNome.innerText = contact.nome;

  const tdEmail = document.createElement("td");
  tdEmail.innerText = contact.email;

  const tdTelefone = document.createElement("td");
  tdTelefone.innerText = contact.telefone;

  tr.innerHTML = "";
  tr.appendChild(tdNome);
  tr.appendChild(tdEmail);
  tr.appendChild(tdTelefone);
  tr.appendChild(editButton);
  tr.appendChild(deleteButton);
}

function mostrarContatos() {
  listaContatos.innerHTML = "";

  for (const contato of contatos) {
    const tr = document.createElement("tr");
    renderContact(contato, tr);
    listaContatos.appendChild(tr);
  }
}
