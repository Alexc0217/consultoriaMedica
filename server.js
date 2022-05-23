import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

import userRoutes from './routes/users.js'


const uri = "mongodb+srv://alex:2222@cluster0.fshmw.mongodb.net/?retryWrites=true&w=majority"

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));


app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname,"views"))
app.use(express.static(path.resolve(__dirname, "assets/css")))
app.use('/script', express.static(path.resolve(__dirname, "assets/script")))

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/user/form', (req, res) => {
    res.render('user/forms');
})

mongoose.connect(uri, )
    .then(() => app.listen(PORT, () => console.log(`Server running on porttt ${PORT}`)))
    .catch((error) => console.log(error.message))
