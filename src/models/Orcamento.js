const { Model, DataTypes } = require("sequelize");

class Orcamento extends Model {
    static init(sequelize) {
        super.init(
            {
                data: DataTypes.STRING,
                hora: DataTypes.STRING,
                enderecoPartida: DataTypes.STRING,
                enderecoEntrega: DataTypes.STRING,
                item: DataTypes.STRING,
                descricao: DataTypes.STRING
            },
            {
                sequelize,
            });
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: "cliente_id" });
        this.belongsToMany(models.Motorista, { as: "Motorista", through: models.MotoristaOrcamento, foreignKey: "orcamento_id"});
    }
}

module.exports = Orcamento;