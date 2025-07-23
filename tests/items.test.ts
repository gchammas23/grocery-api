import request from "supertest";
import app from "../src/app";

describe("Items endpoints", () => {
    it("GET /items with no authorization should return status code 401", async () => {
        const response = await request(app).get("/items").send();

        expect(response.status).toBe(401);
    });

    it("POST /items with no authorization should return status code 401", async () => {
        const response = await request(app).post("/items").send();
        expect(response.status).toBe(401);
    })

    it("DELETE /items/:id with no authorization should return status code 401", async () => {
        const response = await request(app).delete("/items").send();

        expect(response.status).toBe(401);
    });

    it("PUT /items/:id with no authorization should return status code 401", async () => {
        const response = await request(app).put("/items").send();

        expect(response.status).toBe(401);
    });
})