import express, { json } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
// import newsRoutes from './routes/news.js';
import collegesRoutes from './routes/colleges.js';
import {admin} from "./firebase.js";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(json());

app.get('/', (req, res) => {
  res.send('!elloH');
});

app.use('/auth', authRoutes);
app.use("/colleges",collegesRoutes);
// app.use('/news', newsRoutes);
// app.use('/colleges', collegesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
