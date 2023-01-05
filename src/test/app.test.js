import app from "../index"
import supertest from "supertest"
const request = supertest(app)

describe("/test endpoint", () => {
    it("should return a response", async() => {
        const response = await request.get("/")
        expect(response.status).toBe(200)
        expect(response.text).toBe("Hello world!");
    })
})