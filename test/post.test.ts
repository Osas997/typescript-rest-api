import supertest from "supertest";
import { app } from "../src/index";
import { prisma } from "../src/app/database";

describe("GET /api/category", () => {
  it("should get all category", async () => {
    const response = await supertest(app).get("/api/category");

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeUndefined();
  });
});

describe("POST /api/category", () => {
  it("should create category", async () => {
    afterEach(async () => {
      await prisma.category.deleteMany({
        where: {
          name: "test",
        },
      });
    });

    const loginResponse = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = loginResponse.body.data.token;

    const response = await supertest(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`) // Tambahkan header Authorization
      .send({
        name: "test",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBeUndefined();
  });

  it("should create category failed if invalid token", async () => {
    const response = await supertest(app)
      .post("/api/category")
      .set("Authorization", "Bearer invalid-token") // Tambahkan header Authorization
      .send({
        name: "test",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  it("should create category failed if unauthorized role", async () => {
    afterEach(async () => {
      await prisma.user.update({
        where: {
          username: "ciwiz1234",
        },
        data: {
          role: "ADMIN",
        },
      });
    });

    await prisma.user.update({
      where: {
        username: "ciwiz1234",
      },
      data: {
        role: "USER",
      },
    });

    const loginResponse = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = loginResponse.body.data.token;

    const response = await supertest(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
      });

    expect(response.statusCode).toBe(403);
    expect(response.body.error).toBeDefined();
  });
});

describe("PATCH /api/category", () => {
  it("should update category successfully", async () => {
    afterEach(async () => {
      await prisma.category.deleteMany({
        where: {
          name: "test edit",
        },
      });
    });

    const category = await prisma.category.create({
      data: {
        name: "test",
        slug: "test",
      },
    });

    const loginResponse = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = loginResponse.body.data.token;

    const response = await supertest(app)
      .patch(`/api/category/${category.slug}`)
      .set("Authorization", `Bearer ${token}`) // Tambahkan header Authorization
      .send({
        name: "test edit",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeUndefined();
  });

  it("should update category failed if category not found", async () => {
    const loginResponse = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = loginResponse.body.data.token;

    const response = await supertest(app)
      .patch(`/api/category/NO_FOUND`)
      .set("Authorization", `Bearer ${token}`) // Tambahkan header Authorization
      .send({
        name: "test edit",
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});

describe("DELETE /api/category", () => {
  it("should delete category successfully", async () => {
    const category = await prisma.category.create({
      data: {
        name: "test",
        slug: "test",
      },
    });

    const loginResponse = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = loginResponse.body.data.token;

    const response = await supertest(app)
      .delete(`/api/category/${category.slug}`)
      .set("Authorization", `Bearer ${token}`) // Tambahkan header Authorization
      .send({
        name: "test edit",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeUndefined();
  });

  it("should delete category failed if category not found", async () => {
    const loginResponse = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.data.token).toBeDefined();

    const token = loginResponse.body.data.token;

    const response = await supertest(app)
      .delete(`/api/category/NO_FOUND`)
      .set("Authorization", `Bearer ${token}`) // Tambahkan header Authorization
      .send({
        name: "test edit",
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});
