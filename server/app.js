import express from 'express';
// import body-parser for extracting body portion
import bodyParser from 'body-parser';
// import the index routes
import routes from './routes/index';
// import swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';


const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // for only passing strings and arrays
app.use(bodyParser.json());// accept json data

// redirect to the routes
app.use('/api/v1/', routes);

// redirect to swagger json
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Index of autmart
app.get('/', (req, res) => res.status(200).json({
	status: 200,
   	message: 'Welcome to AutoMart, Online shop for cars.'
}));

// accept static files
app.use('/ui', express.static('UI'));

app.use((req, res) => {
  return res.status(404).json({
    status: 404,
    message: 'URL not found',
  });
});

export default app;
