import asyncHandler from 'express-async-handler';
import { ldapService } from '../services/ldapService.js';
import { generateToken } from '../utils/generateToken.js';

export const authController = {
  login: asyncHandler(async (req, res) => {
    const { name, password } = req.body;
    const admins = await ldapService.getAllAdmins();
    const admin = admins.find(admin => 
      admin.username === name && admin.password === password
    );
    
    if (admin) {
      const token = generateToken(res, name);
      res.json({ message: name });
    } else {
      console.log("Failed login");
      res.status(401).json({ message: 'Invalid credentials' });
    }
  })
};