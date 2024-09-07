import express from "express";
import {
  calculateEMI,
  getAllEMIs,
  getEMIById,
} from "../controllers/emi.controllers.js";

const emiRouter = express.Router();

emiRouter.post("/calculate-emi", calculateEMI);
emiRouter.get("/emis", getAllEMIs);
emiRouter.get("/:id", getEMIById);

export default emiRouter;
