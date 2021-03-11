import request from 'supertest';
import { app } from '../../src/app';
import createConnection from '../../database/index';

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        
        await connection.dropDatabase();
        
        await connection.runMigrations();
    });

    it("The test should be able to create a new user", async ()=> {
        const response = await request(app).post('/users').send({
            email: "teste1@teste.com",
            name: "Usuário de teste",
        });

        expect(response.status).toBe(201);
    });

})