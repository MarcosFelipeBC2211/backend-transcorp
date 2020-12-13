const MotoristaOrcamento = require("../models/MotoristaOrcamento");
const Motorista = require("../models/Motorista");
const Orcamento = require("../models/Orcamento");
module.exports = {
    async index(req, res) {
        //validando perfil do usuário no controller
        const { usuarioId, usuarioPerfil } = req;
        // if (usuarioPerfil !== "motorista")
        //     return res.status(403).send({ erro: "acesso negado" });
        try {
            const motorista = await MotoristaOrcamento.findAll(
                {
                    include: {
                        association: "Motorista",
                        attributes: ["id", "nome"]
                    },
                    order: [["created_at", "DESC"]],
                    where: {
                        orcamento_id: req.params.id,
                    }
                });
            res.send(motorista);
        } catch (error) {
            console.log(error);
        }
    },

    async store(req, res) {
        const { usuarioId, usuarioPerfil } = req;
        if (usuarioPerfil !== "motorista")
            return res.status(403).send({ erro: "acesso negado" });

        const motorista_id = req.usuarioId; //busca os dados do motorista
        const orcamento_id = req.params.id; //busca os dados do motorista
        const { valor } = req.body;
        
        try {
            const motorista = await Motorista.findByPk(motorista_id);
            if (!motorista) {
                res.status(404).send({ erro: "Motorista não encontrado" });
            }

            const orcamento = await Orcamento.findByPk(orcamento_id);
            if (!orcamento) {
                res.status(404).send({ erro: "Orçamento não encontrado" });
            }

            let resposta = await orcamento.addMotorista(motorista, {
                through: {valor: valor}
            });
            res.status(201).send({usuario: {resposta}});
        }
        catch (e) {
            console.error(e)
            return res.status(500).send({ erro: "Não foi possivel adicionar a Resposta, tente novamente mais tarde." })
        }
    }

}
