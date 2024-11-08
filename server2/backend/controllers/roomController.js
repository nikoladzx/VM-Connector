import asyncHandler from 'express-async-handler';
import { ldapService } from '../services/ldapService.js';

export const roomController = {
  getRooms: asyncHandler(async (req, res) => {
    try {
      const rooms = await ldapService.getAllRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ 
        message: 'Failed to retrieve rooms', 
        error: error.message 
      });
    }
  })
};