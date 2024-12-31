import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

// Rotas em express são chamadas de acordo como foram declaradas, cuidado com a ordem que as declarar, declare primeiro as que tem maior complexidade primeiro!
routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/busca", LivroController.listarLivrosPorEditora);
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.post("/livros", LivroController.cadastrarLivros);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.excluirLivro);

export default routes;