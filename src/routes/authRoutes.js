import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login)
router.post('/register',register)
router.get('/test', (req, res) => {
    console.log("test api hit")
    res.send("hello form auth test")
})

export default router;