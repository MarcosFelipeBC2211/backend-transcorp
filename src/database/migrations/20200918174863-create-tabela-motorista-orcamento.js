'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //aqui dizemos o que deve ser feito
    return queryInterface.createTable("motorista_orcamento", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      motorista_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "motoristas",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      orcamento_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orcamentos",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
  })
},

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("motoristaOrcamento")
  }
};
