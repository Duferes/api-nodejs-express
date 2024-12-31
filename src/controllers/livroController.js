// interface entre as requisiçoes e o que acontece em cada requisição
import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js"

class LivroController {
    static async listarLivros (req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros); 
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` })
        }   
    };

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id
            const livroEncontado = await livro.findById(id);
            res.status(200).json(livroEncontado); 
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro` })
        }     
    };

    static async cadastrarLivros (req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor)
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` })
        }
    }

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "livro atualizado!" }); 
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do livro` })
        }    
    };

    static async excluirLivro (req, res) {
        try {
            const id = req.params.id
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "livro excluido!" }); 
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao excluir livro` })
        }    
    };

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora }) 
            //1° editora = propriedade editora do livro; 2° editora: variável que está guardando a informação
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na busca` })
        }
    }
};

export default LivroController;
