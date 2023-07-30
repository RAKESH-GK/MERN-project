const dotenv = require('dotenv');
const express = require('express');

const app = express();
app.use(express.json());

//config.env 
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;

//connecting database 
require('./db/connection');

//linking router
app.use(require('./router/auth'));

//creating middleware
const middleware = (req, res, next) => {
    console.log("this is my middleware");
    next();
}

app.listen(PORT, (req, res) => {
    console.log(`server running at port ${PORT}`);
})