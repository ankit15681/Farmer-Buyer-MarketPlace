import express from 'express';
import { getFarmers, getFarmer, createFarmer, updateFarmer, deleteFarmer, getFarmersBySearch } from '../controllers/farmers.js';
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get('/', getFarmers);
router.get('/search', getFarmersBySearch);
router.get('/:id', getFarmer);
router.post('/', auth, createFarmer);
router.patch('/:id', auth, updateFarmer);
router.delete('/:id', auth, deleteFarmer);



export default router;