import { Router } from "express";
import {
  getAllEmpanadas,
  getEmpanadaById,
  createEmpanada,
  updateEmpanada,
  deleteEmpanada,
} from "../controllers/empanadasController.js";

const router = Router();

router.get("/", getAllEmpanadas); //listar
router.get("/:id", getEmpanadaById); //ver por id
router.post("/", createEmpanada); //crear
router.put("/:id", updateEmpanada); //actualizar
router.delete("/:id", deleteEmpanada); //eliminar

export default router;
