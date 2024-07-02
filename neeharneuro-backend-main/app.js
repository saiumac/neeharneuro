const express = require("express");
const app = express();
const http = require('http');
const cors = require("cors");
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const PORT = 7071;
const expressLayouts = require('express-ejs-layouts');


app.use(expressLayouts);
app.set('view engine', 'ejs');


if(swaggerFile.host == 'localhost:7071'){
    process.env.IsLocal = 1
}else{
    process.env.IsLocal = 0
}
app.use(cors({ origin:'*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const apirouter = require('./routes');
app.use("/api",apirouter.api);

app.use('/assets', express.static(__dirname + '/assets'));

// Serve Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Welcome to Neehar Neuro!\n');
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
})

app.listen(PORT, () => {
    console.log(`Server listening at 🚀 http://${swaggerFile.host}/swagger`);
})
