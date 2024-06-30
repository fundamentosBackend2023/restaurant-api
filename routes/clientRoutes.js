const express = require('express');
const router = express.Router();
const clientServices = require('../services/clientServices');
const { localMw } = require('../middlewares/exampleMW');

router.get('/', async (req, res) => {
    const clients = await clientServices.getAll()
    res.status(200).json({
        clients,
        message: 'Here is the client list'
    });
});

router.get('/:id',
    localMw,
    async (req, res, next) => {
        try{
            const clientId = req.params.id;
            const client = await clientServices.getOne(clientId);
            res.status(200).json({
                client,
                message: 'Here is the client list'
            });
        }catch(error){
            next(error);
        }
});

router.post('/', async (req, res) => {
    const info = req.body;
    await clientServices.create(info);
    res.status(201).json({
        message: 'client list updated'
    });
});

router.patch('/update-first-name/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName } = req.body;
    await clientServices.updateFirstName(id, firstName)
    res.status(200).json({
        message: 'client updated'
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await clientServices.remove(id);
    res.status(200).json({
        message: 'client deleted'
    });
});

module.exports = router;