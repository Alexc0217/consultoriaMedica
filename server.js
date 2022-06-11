const express = require('express');
const bodyParser = require("body-parser");
const mongoose =  require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');


const app = express();

const uri = "mongodb+srv://alex:2222@cluster0.fshmw.mongodb.net/?retryWrites=true&w=majority"

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json())


app.set('view engine', 'ejs')
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/script', express.static(path.resolve(__dirname, "assets/script")))
app.use('/account', express.static(path.resolve(__dirname, "assets/script")))
app.use('/bootstrap', express.static(path.resolve(__dirname, "node_modules/bootstrap/dist/css")))

app.use('/', require('./server/routes/router.js'));

mongoose.connect(uri)
    .then(() => app.listen(PORT, () => console.log(`Server running on porttt ${PORT}`)))
    .catch((error) => console.log(error.message))
