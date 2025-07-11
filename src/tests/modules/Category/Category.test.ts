import request from "supertest";
import express from "../../../config/express";

const app = express();

describe("POST /api/category/listing", () =>{
  it('should return "Object"', async () =>{
    const res = await request(app)
    .post("/api/category/listing")
    .send({ page: 1, pageSize: 10})
    .set("Accept", "application/json")

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      status: true, message: "successfull"
    })

    expect(Array.isArray(res.body.data)).toBe(true);

    res.body.data.forEach((item: any)=>{
      expect(item).toEqual(expect.any(Object))
    })
  })
})
