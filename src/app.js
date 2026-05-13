import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
const app = express();
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send("Hello from server")
})
app.get('/test', (req, res) => {
    res.send("hello form  test")
})
app.use('/api/auth', authRouter)

export default app