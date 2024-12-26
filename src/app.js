import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import userRoute from './routes/userRoute.js';
import authrouter from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
import supplierRoute from './routes/supplierRoute.js';
import receptionRoute from './routes/receptionRoute.js';
import saleRoute from './routes/saleRoute.js';
import inventoryRoute from './routes/inventoryRoute.js';
import i18n from './config/i18n.js';
import middleware from 'i18next-http-middleware';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mouvementRoute from './routes/mouvementRoute.js';

const app = express();

config();
// const corsOptions = {
//   origin: 'http://localhost:5173', // Origine de votre frontend
//   // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Autorise les méthodes nécessaires
//   // credentials: true,
//   // allowedHeaders: ['Content-Type', 'Authorization'],
//   optionSuccessStatus: 200,
// };
const allowedOrigins = ['http://localhost:5173', 'https://pos-frontend-livid.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(helmet());

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: "Try after 15 minutes",
//     headers: true,
// });
// app.use(limiter);

app.use(middleware.handle(i18n));

// app.use(express.json());

// const corsOptions = {
//     origin: 'http://localhost:5174',
// };
// const corsOptions = {
//     origin: 'http://localhost:5173/',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

app.use('/api', userRoute);
app.use('/api', authrouter);
app.use('/api', productRoute);
app.use('/api', supplierRoute);
app.use('/api', receptionRoute);
app.use('/api', saleRoute);
app.use('/api', inventoryRoute);
app.use('/api', mouvementRoute);

app.get('/', (_req, res) => {
  res.send('hello POS');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
