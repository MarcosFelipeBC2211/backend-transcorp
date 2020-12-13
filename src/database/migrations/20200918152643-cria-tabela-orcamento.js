'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.createTable("orcamentos", {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true
      },
      data:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      hora:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco_partida:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco_entrega:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      item:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      cliente_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "clientes",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      motorista_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "motoristas",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
      
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("orcamentos")
  }
};
