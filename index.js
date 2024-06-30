const express = require('express');
const app = express();

const configureRoutes = require('./routes');
const { globalMw } = require('./middlewares/exampleMW');
const connectToMongo = require('./libs/mongo')
const { logger, boomErrorHandler,
        mongooseErrorHandler,
        generalErrorHandler
    } = require('./middlewares/errorHandlers');

const port = process.env.PORT

app.use(express.json());
app.use(globalMw);
// app.use('/clients', (req, res, next) => {
//     console.log('you are accessing clients mw');
//     next();
// });

configureRoutes(app);
connectToMongo()

app.use(logger);
app.use(boomErrorHandler);
app.use(mongooseErrorHandler);
app.use(generalErrorHandler);


app.get('/', (req, res) => {
    res.send('This is your main route');
});

app.listen(port, () => {
    console.log('server running on',port);
});