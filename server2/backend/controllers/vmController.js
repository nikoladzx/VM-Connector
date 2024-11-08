import asyncHandler from 'express-async-handler';
import { keycloakService } from '../services/keycloakService.js';

export const vmController = {
  createVirtualMachine: asyncHandler(async (req, res) => {
    try {
      await keycloakService.createVirtualMachine(req.body);
      res.status(201).json({ message: 'Virtual Machine created successfully' });
    } catch (error) {
      console.error('Error details:', error.response?.data);
      res.status(500);
      throw new Error('Failed to create Vritual Machine in Keycloak');
    }
  }),

  getVMs: asyncHandler(async (req, res) => {
    try {
      const vms = await keycloakService.getVirtualMachines();
      res.status(200).json(vms);
    } catch (error) {
      console.error('Error details:', error.response?.data);
      res.status(500);
      throw new Error('Failed to retrieve VMs from Keycloak');
    }
  })
};