const express = require('express');
const mainRouter = express.Router();
const clientsRouter = require('./clientRoutes');

const connectRoutes = app => {
    app.use('/api/v1', mainRouter);
    mainRouter.use('/clients',clientsRouter)
}

module.exports = connectRoutes;