import {expect} from "chai";
import firebaseFunctionsTest from "firebase-functions-test";
import * as functions from "../index.js";
import admin from "firebase-admin";
import cors from "cors";

const mockCors = cors({origin: "*"});

// initializing firebase admin only once
if (admin.apps.length === 0) {
  admin.initializeApp();
}

process.env.NODE_ENV = "test";

const testEnv = firebaseFunctionsTest();

describe("vehicle CRUD Operations", () => {
  let vehicleId;

  after(() => {
    testEnv.cleanup(); // cleans data after testing
  });

  it("should create a new vehicle", async () => {
    const data = {
      plate: "ABC1234",
      chassis: "12345678901234567",
      renavam: "12345678901",
      model: "Jetta",
      brand: "Volkswagen",
      year: 2024,
    };

    const req = {body: data};
    const res = {
      status: (statusCode) => ({
        json: (result) => {
          expect(statusCode).to.equal(201);
          expect(result).to.have.property("id");
          vehicleId = result.id;
        },
      }),
    };

    await functions.createVehicle(req, res, mockCors);
  });

  it("should get all vehicles", async () => {
    const req = {};
    const res = {
      status: (statusCode) => ({
        json: (result) => {
          expect(statusCode).to.equal(200);
          expect(result).to.be.an("array");
        },
      }),
    };

    await functions.getVehicles(req, res, mockCors);
  });

  it("should get a vehicle by ID", async () => {
    const req = {query: {id: vehicleId}};
    const res = {
      status: (statusCode) => ({
        json: (result) => {
          expect(statusCode).to.equal(200);
          expect(result).to.have.property("id", vehicleId);
        },
      }),
    };

    await functions.getVehicle(req, res, mockCors);
  });

  it("should update a vehicle", async () => {
    const req = {
      query: {id: vehicleId},
      body: {year: 2024},
    };
    const res = {
      status: (statusCode) => ({
        json: (result) => {
          expect(statusCode).to.equal(200);
          expect(result).to.have.property("year", 2024);
        },
      }),
    };

    await functions.updateVehicle(req, res, mockCors);
  });

  it("should delete a vehicle", async () => {
    const req = {query: {id: vehicleId}};
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(204);
        return {
          send: () => {},
        };
      },
    };

    await functions.deleteVehicle(req, res, mockCors);
  });
});
