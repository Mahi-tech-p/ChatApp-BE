import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
const app = express();
// app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true,
}));
app.get('/', (req, res) => {
    res.send("Hello from server")
})
app.get('/test', (req, res) => {
    res.send("hello form  test")
})
app.use('/api/auth', authRouter)

export default app