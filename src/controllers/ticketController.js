const ticketModel = require("../models/ticketModel");

const getAllIngressos = async (req, res) => {
    try {
        const ingressos = await ticketModel.getIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingresso." });
    }
};

const getIngresso = async (req, res) => {
    try {
        const ingresso = await ticketModel.getIngressoById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso." });
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ticketModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
	console.log(error);
        if (error.code === "23505") { 
            return res.status(400).json({ message: "Ingresso já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao conseguir ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updateIngresso = await ticketModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updateIngresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updateIngresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar um ingresso." });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const message = await ticketModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar um ingresso." });
    }
};

module.exports = { getAllIngressos, getIngresso, createIngresso, updateIngresso, deleteIngresso };


