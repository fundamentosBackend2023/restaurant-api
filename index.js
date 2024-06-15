const express = require('express');
const app = express();

const port = 3000

app.use(express.json())

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

app.post('/clients', (req, res) => {
    const info = req.body
    const clientsAmount =  (Object.keys(clients)).length + 1
    console.log(clientsAmount)
    clients[clientsAmount] = info
    console.log(clients)
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