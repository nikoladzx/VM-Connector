import { Router } from 'express';
import { vmController } from '../controllers/vmController.js';
import { roomController } from '../controllers/roomController.js';
import { authController } from '../controllers/authController.js';
import {protect} from '../middleware/authMiddleware.js'

const router = Router();

// Auth routes
router.post("/login", authController.login);

// vm routes
router.post("/create", protect, vmController.createVirtualMachine);
router.get("/vms", protect, vmController.getVMs);

// Room routes
router.get("/rooms", roomController.getRooms);

export const initializeRoutes = (app) => {
  app.use('/api', router);
};