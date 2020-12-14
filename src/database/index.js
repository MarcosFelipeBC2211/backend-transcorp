const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Cliente = require("../models/Cliente");
const Motorista = require("../models/Motorista");
const Solicitacoes = require("../models/Solicitacao");
const Postagem = require("../models/Postagem");
const MotoristaOrcamento = require("../models/MotoristaOrcamento");
const Orcamento = require("../models/Orcamento");

//nova instancia da classe sequelize passando as configurações do banco de dados
const connection = new Sequelize(dbConfig.url, dbConfig.config);
//inicializando as models
Cliente.init(connection);
Motorista.init(connection);
Solicitacoes.init(connection);
Postagem.init(connection);
Orcamento.init(connection)
MotoristaOrcamento.init(connection);

//inicializando as associações
Cliente.associate(connection.models);
Motorista.associate(connection.models);
Solicitacoes.associate(connection.models);
Postagem.associate(connection.models);
Orcamento.associate(connection.models);
// MotoristaOrcamento.associate(connection.models);

//exportamos a configuração
module.exports = connection;