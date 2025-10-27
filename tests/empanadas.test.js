import request from "supertest";
import app from "../src/index.js";

describe("API Empanadas", () => {
  it("GET /empanadas debería devolver 200 y un array", async () => {
    const res = await request(app).get("/empanadas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /empanadas debería crear una empanada", async () => {
    const newEmpanada = {
      name: "Empanada de queso",
      price: 1200,
      type: "Frinta",
      filling: "Queso",
    };
    const res = await request(app).post("/empanadas").send(newEmpanada);
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe(newEmpanada.nombre);
    expect(res.body.precio).toBe(newEmpanada.precio);
  });

  describe("eliminar la primera empanada de la lista id asc", () => {
    let empanadaId;

    beforeAll(async () => {
      const res = await request(app).get("/empanadas");
      empanadaId = res.body[0]?.id;
    });

    it("DELETE /empanadas/:id debería eliminar una empanada", async () => {
      if (!empanadaId) {
        return;
      }
      const res = await request(app).delete(`/empanadas/${empanadaId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Empanada eliminada");
    });
  });
});
