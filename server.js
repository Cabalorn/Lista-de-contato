const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const contatos = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/add-contact", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;

  const novoContato = {
    nome,
    email,
    telefone,
  };

  contatos.push(novoContato);

  res.status(201).json({ message: "Contato adicionado com sucesso" });
  io.emit("contatos:atualizados");

  const indice = contatos.indexOf(novoContato);
  const linha = indice + 1;
  io.emit("contato:adicionado", novoContato, linha);
});

io.on("connection", (socket) => {
  console.log("Usuário conectado");

  socket.emit("contatos:atualizados", contatos);

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
