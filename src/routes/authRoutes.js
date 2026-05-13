import express from 'express';
import { login } from '../controllers/login.js';

const router = express.Router();

router.post('/login', login)
router.get('/test', (req, res) => {
    console.log("test api hit")
    res.send("hello form auth test")
})

export default router;