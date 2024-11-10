import {onRequest} from "firebase-functions/v2/https";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccount = JSON.parse(
    fs.readFileSync(path.resolve("./serviceAccountKey.json"), "utf8"));

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const db = admin.firestore();

// create a new vehicle
export const createVehicle = onRequest(async (req, res) => {
  try {
    const {plate, chassis, renavam, model, brand, year} = req.body;
    const docRef = await db.collection("vehicles").add({
      plate, chassis, renavam, model, brand, year});
    res.status(201)
        .json({id: docRef.id, plate, chassis, renavam, model, brand, year});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// list all vehicles
export const getVehicles = onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("vehicles").get();
    const vehicles = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get one vehicle per ID
export const getVehicle = onRequest(async (req, res) => {
  try {
    const {id} = req.query;
    const doc = await db.collection("vehicles").doc(id).get();
    if (!doc.exists) {
      res.status(404).send("Vehicle not found");
    } else {
      res.status(200).json({id: doc.id, ...doc.data()});
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update a vehicle
export const updateVehicle = onRequest(async (req, res) => {
  try {
    const {id} = req.query;
    const updates = req.body;
    await db.collection("vehicles").doc(id).update(updates);
    res.status(200).json({id, ...updates});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete a vehicle
export const deleteVehicle = onRequest(async (req, res) => {
  try {
    const {id} = req.query;
    await db.collection("vehicles").doc(id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});
