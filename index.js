const express = require('express'),
database = require('./app/config/database'),
compression = require('compression')
app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var path = require('path')
var routesApi = require('./routes')
var routesAppApi = require('./mobileRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import the swagger configuration

app.set('view engine', 'ejs')
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString()
  },
  limit: '50mb'
}));

app.use(cors());

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(cors())
app.use(compression())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')))
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use('/api', routesApi);
app.use('/mobileApi', routesAppApi);

// database connectivity
database.mongoose

const start = async () => {
  app.listen(process.env.PORT, () => {
    console.log("*********App is listening to port:", process.env.PORT);
  })
}

start()