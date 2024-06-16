const express = require('express');
const router = express.Router();
const clientServices = require('../services/clientServices');
const { localMw } = require('../middlewares/exampleMW');

router.get('/', (req, res) => {
    const clients = clientServices.getAll()
    res.status(200).json({
        clients,
        message: 'Here is the client list'
    });
});

router.get('/:id',
    localMw,
    (req, res) => {
    const clientId = req.params.id;
    const client = clientServices.getOne(clientId);
    res.status(200).json({
        client,
        message: 'Here is the client list'
    });
});

router.post('/', (req, res) => {
    const info = req.body;
    clientServices.create(info);
    res.status(201).json({
        message: 'client list updated'
    });
});

router.patch('/update-first-name/:id', (req, res) => {
    const { id } = req.params;
    const { firstName } = req.body;
    clientServices.updateFirstName(id, firstName)
    res.status(200).json({
        message: 'client updated'
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    clientServices.remove(id);
    res.status(200).json({
        message: 'client deleted'
    });
});

module.exports = router;