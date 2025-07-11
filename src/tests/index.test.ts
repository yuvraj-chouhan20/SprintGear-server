import request from "supertest";
import express from "../config/express";

const app = express();
describe("GET /", () =>{
  it('should return "Hello world from Server"', async () =>{
    const res = await request(app).get("/")
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Hello world");
  })
})
