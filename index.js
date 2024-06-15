const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
    console.log('this is a global mw');
    next()
});
app.use('/clients', (req, res, next) => {
    console.log('you are accessing clients mw');
    next();
});

const localMw = (req, res, next) => {
    console.log('this is a local mw');
    next();
}

const clients = {
    c1: {
        firstName: 'Miriam',
        lastName: 'Hernandez',
        spentAmount: '500'
    }
}

app.get('/clients', (req, res) => {
    res.status(200).json({
        clients,
        message: 'Here is the client list'
    });
});

app.get('/clients/:id',
    localMw,
    (req, res) => {
    const clientId = req.params.id;
    const client = clients[clientId];
    res.status(200).json({
        client,
        message: 'Here is the client list'
    });
});

app.post('/clients', (req, res) => {
    const info = req.body;
    const clientsAmount =  (Object.keys(clients)).length + 1;
    clients[clientsAmount] = info;
    res.status(201).json({
        message: 'client list updated'
    });
});

app.patch('/clients/update-first-name/:id', (req, res) => {
    const { id } = req.params;
    const { firstName } = req.body;
    clients[id].firstName = firstName;

    res.status(200).json({
        message: 'client updated'
    });
});

app.delete('/clients/:id', (req, res) => {
    const { id } = req.params;
    delete clients[id]

    res.status(200).json({
        message: 'client deleted'
    });
});


app.get('/', (req, res) => {
    res.send('This is your main route');
});

app.listen(port, () => {
    console.log('server running on',port);
});