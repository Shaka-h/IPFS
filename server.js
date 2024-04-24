import axios from 'axios';
import cors from 'cors';
import express from 'express';
import router from './routes/ipfs.js';


const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

// Include route files

// Use routes
app.use('/createCollection', router);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
