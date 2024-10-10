import express from 'express';
import { authSteamAccount } from '../controllers/authSteamAccount';

const router = express.Router();

router.get('/authQr', authSteamAccount);

export default router;