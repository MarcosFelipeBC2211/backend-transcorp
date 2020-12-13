//subir o servidor no supertest
//criar variavel de ambiente para rodar o teste no bd de teste


const request = require("supertest");
const app = require("../../src/app");
const conex = require("../../src/database/index");
const truncate = require("./truncate")

describe("ORCAMENTO", () => {
    afterAll(() => {
        conex.close();
    });

    beforeEach(async(done) => {
        await truncate(conex.models);
        done();
    });

    it("É possível criar um novo orcamento", async () => {
        const response = await request(app).post("/orcamento").send({
            "data": "12/12/20",
            "hora": "18:00",
            "enderecoPartida": "Av. Autonomistas",
            "enderecoChegada": "Av. Presidente Costa e Silva",
            "item": "air fyer",
            "descricao": "fritadeira elétrica",
        });
        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });
});