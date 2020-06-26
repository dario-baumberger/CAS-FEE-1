"use strict";

import express from "express";
import { notesController } from "../controllers/notesController";

const router = express.Router();

router.get("/", notesController.all.bind(notesController));
router.post("/", notesController.add.bind(notesController));
router.get("/:id", notesController.get.bind(notesController));
router.patch("/:id", notesController.update.bind(notesController));
router.put("/:id", notesController.update.bind(notesController));
router.delete("/:id", notesController.delete.bind(notesController));

export const notesRoutes = router;
