const { Model, DataTypes } = require("sequelize");

class Motorista extends Model {
    static init(sequelize) {//cadastra um json com os campos da tabela
        super.init(
            {
                nome: DataTypes.STRING,
                dataNascimento: DataTypes.STRING,
                cpf: DataTypes.STRING,
                cnpj: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING,
                celular: DataTypes.STRING,
                fotoMotorista: DataTypes.STRING
            },
            {
                sequelize,
                tableName: "motoristas"
            });
    }
    static associate(models) {
        console.log(models)
        this.hasMany(models.Postagem, { foreignKey: "motorista_id" });
        this.belongsToMany(models.Orcamento, {foreignKey: "motorista_id", through: models.MotoristaOrcamento })
    }
}

module.exports = Motorista;