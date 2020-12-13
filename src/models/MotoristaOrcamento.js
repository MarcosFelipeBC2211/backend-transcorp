const { Model, DataTypes } = require("sequelize");

class MotoristaOrcamento extends Model {
    static init (sequelize) {//cadastra um json com os campos da tabela
        super.init(
        {
            valor: DataTypes.STRING,
        },
        {
          sequelize,
          tableName: "motorista_orcamento"
        });
    }

    static associate(models) {
        this.belongsTo(models.Motorista, { as: "Motorista", foreignKey: "motorista_id" });
        this.belongsTo(models.Orcamento, { as: "Orcamento", foreignKey: "orcamento_id" });
    }
}



module.exports = MotoristaOrcamento;