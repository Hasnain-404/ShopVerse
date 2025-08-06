import { requireAuth } from '@clerk/express';
import { saveUser, becameSeller, fetchSeller } from '../controllers/userControllers.js';
import express from 'express';
const router = express.Router();

// Route for Google authentication
router.post('/save-user', saveUser);
router.post('/become-seller', requireAuth(), becameSeller);
router.get('/fetch-seller', requireAuth(), fetchSeller);

export default router;