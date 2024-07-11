import supertest from "supertest";
import { app } from "../src/index";
import { prisma } from "../src/app/database";

describe("POST /api/register", () => {
  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        username: "puki",
      },
    });
  });

  it("should reject if request is invalid", async () => {
    const response = await supertest(app).post("/api/register").send({
      name: "",
      username: "puki",
      password: "",
    });

    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBeDefined();
  });

  it("should reject if username already exists", async () => {
    await supertest(app).post("/api/register").send({
      name: "toriq",
      username: "toriq123",
      password: "password",
    });

    const response = await supertest(app).post("/api/register").send({
      name: "toriq",
      username: "toriq123",
      password: "password",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should register successfully", async () => {
    const response = await supertest(app).post("/api/register").send({
      name: "john",
      username: "puki",
      password: "password",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBeUndefined();
  });
});

describe("POST /api/login", () => {
  it("should login successfully", async () => {
    const response = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.error).toBeUndefined();
  });

  it("should login failed if username or password is wrong", async () => {
    const response = await supertest(app).post("/api/login").send({
      username: "salahusername",
      password: "salahpassword",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  it("should login failed if invalid request", async () => {
    const response = await supertest(app).post("/api/login").send({
      username: "",
      password: "",
    });

    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBeDefined();
  });
});

describe("POST /api/refresh", () => {
  it("should refresh token successfully", async () => {
    const responseLogin = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    const refreshToken = responseLogin.body.data.refreshToken;

    const response = await supertest(app).post("/api/refresh").send({
      token: refreshToken,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.error).toBeUndefined();
  });

  it("should refresh token failed if token field is empty", async () => {
    const responseLogin = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    const refreshToken = responseLogin.body.data.refreshToken;

    const response = await supertest(app).post("/api/refresh").send({});

    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBeDefined();
  });

  it("should refresh token failed if token is invalid", async () => {
    const responseLogin = await supertest(app).post("/api/login").send({
      username: "ciwiz1234",
      password: "emanslur",
    });

    const refreshToken = responseLogin.body.data.refreshToken;

    const response = await supertest(app)
      .post("/api/refresh")
      .send({
        token: refreshToken + "invalid",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeDefined();
  });
});
