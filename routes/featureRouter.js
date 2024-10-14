import express from 'express';
import { createFeature, getFeature } from '../controllers/featureController.js';

const router = express.Router();

router.route('/').post(createFeature).get(getFeature);

export default router;