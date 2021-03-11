import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../../database'

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "a",
            description: "a"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all Surveys", async () => {
        await request(app).post("/surveys").send({
            title: "servey",
            description: "Descricao survey"
        });
        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });
});