const pool = require("../config/database");

const getIngressos = async () => {
    const result = await pool.query("SELECT * FROM ingressos");
    return result.rows;
};

const getIngressoById = async (id) => {
    const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
    return result.rows[0];
};

const createIngresso = async (evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    if (quantidade_disponivel <= 0) {
        throw new Error("Ingressos esgotados.");
    }

    if (categoria === "Pista" && preco < 100) {
        throw new Error("O preço mínimo para Pista é R$100,00");
    } else if (categoria === "Pista VIP" && preco < 200) {
        throw new Error("O preço mínimo para Pista VIP é R$200,00");
    } else if (categoria === "Camarote" && preco < 300) {
        throw new Error("O preço mínimo para Camarote é R$300,00");
    } else if (categoria === "Arquibancada" && preco < 80) {
        throw new Error("O preço mínimo para Arquibancada é R$80,00");
    }

    const result = await pool.query(
        "INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [evento, local, data_evento, categoria, preco, quantidade_disponivel]
    );

    return result.rows[0];
};


const updateIngresso = async (id, evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "UPDATE ingressos SET evento = $1, local = $2, data_evento = $3, categoria = $4, preco = $5, quantidade_disponivel = $6 WHERE id = $7 RETURNING *",
        [evento, local, data_evento, categoria, preco, quantidade_disponivel, id]
    );
    return result.rows[0];
};

const deleteIngresso = async (id) => {
    const result = await pool.query("DELETE FROM ingressos WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        return { error: "Ingresso não encontrado." };
    }

    return { message: "Ingresso excluído." };
};


const vendaIngresso = async (id, quantidade) => {
const result = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);

if (!result.rows.length) {
return { error: "Ingresso não encontrado." };
}

const ingresso = result.rows[0];

if (ingresso.quantidade_disponivel < quantidade) {
return { error: "Quantidade insuficiente de ingressos disponíveis." };
}

const novaQuantidade = ingresso.quantidade_disponivel - quantidade;

const updateResult = await pool.query(
"UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *",
[novaQuantidade, id]
);

return updateResult.rows[0];
};


    
module.exports = { getIngressos, getIngressoById, createIngresso, updateIngresso, deleteIngresso, vendaIngresso };
