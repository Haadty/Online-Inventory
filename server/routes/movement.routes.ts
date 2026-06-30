import { Router } from "express";
import {
    getMovements,
    createMovement,
    deleteMovement
} from "../controllers/movement.controller";

const movementRoutes = Router();

movementRoutes.get("/", getMovements);
movementRoutes.post("/", createMovement);
movementRoutes.delete("/:id", deleteMovement);

export default movementRoutes;