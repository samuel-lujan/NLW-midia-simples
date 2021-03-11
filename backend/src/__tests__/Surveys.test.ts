import request from 'supertest';
import { app } from '../../src/app';
import createConnection from '../../database/index';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();

        await connection.dropDatabase();
        
        await connection.runMigrations();
    });


    it("The thest can be able to get all the questions", async() => {
        const response = await request(app).get('/surveys')

        expect(response.status).toBe(200);
    });

    it("The test can be able to insert some question", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Primeira pergunta de Teste",
            description: "Essa é a primeira pergunta de de teste",
        });
        
        expect(response.status).toBe(201);
    });
});