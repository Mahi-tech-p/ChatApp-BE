import express from 'express';
import { getMe, login, logout, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login)
router.post('/register',register)
router.get('/test', (req, res) => {
    console.log("test api hit")
    res.send("hello form auth test")
})
router.get("/me", protect, getMe);
router.post("/logout", logout);

export default router;