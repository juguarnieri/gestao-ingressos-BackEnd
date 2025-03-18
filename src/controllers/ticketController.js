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
    const {
      evento,
      local,
      data_evento,
      categoria,
      preco,
      quantidade_disponivel,
    } = req.body;

    const minPrecos = {
      Pista: 100,
      "Pista VIP": 200,
      Camarote: 300,
      Arquibancada: 80,
    };

    if (preco < minPrecos[categoria]) {
      return res
        .status(400)
        .json({
          message: `Preço mínimo para ${categoria} é R$${minPrecos[categoria]},00.`,
        });
    }

    const newIngresso = await ticketModel.createIngresso(
      evento,
      local,
      data_evento,
      categoria,
      preco,
      quantidade_disponivel
    );
    res.status(201).json(newIngresso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar ingresso." });
  }
};

const vendaIngresso = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    const result = await ticketModel.sellIngresso(id, quantidade);
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.json({ message: "Venda realizada com sucesso.", ingresso: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a venda." });
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


module.exports = { getAllIngressos, getIngresso, createIngresso, updateIngresso, deleteIngresso, vendaIngresso };
