import request from "supertest";
import app from "../src/app";
import db from "../src/db";

describe("Authentication Endpoints", () => {
    it("POST /register should return status code 400 with empty data", async () => {
        const response = await request(app).post("/auth/register").send({});

        expect(response.status).toBe(400);
    });

    it("POST /auth/register should return status code 400 with only one field", async () => {
        const response = await request(app).post("/auth/register").send({ username: "admin" });

        expect(response.status).toBe(400);
    })

    it("POST /auth/register should return status code 200 with valid data", async () => {
        const response = await request(app).post("/auth/register").send({
            username: "test",
            password: "test"
        });
        expect(response.status).toBe(200);
    })

    it("POST /auth/login should return status code 200 and access token", async () => {
        const response = await request(app).post("/auth/login").send({
            username: "test",
            password: "test"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
    })
})

afterAll(async() => {
    await db('users').where({ username: "test" }).del();
    await db.destroy();
})