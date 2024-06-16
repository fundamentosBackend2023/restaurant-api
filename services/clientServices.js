const clients = require('../libs/clients');

class Client {
    constructor(){}

    static getAll(){
        const myClients = clients;
        return myClients;
    }

    static getOne(clientId){
        const client = clients[clientId];
        return client;
    }

    static create(info){
        const clientsAmount =  (Object.keys(clients)).length + 1;
        clients[clientsAmount] = info;
        return true;
    }

    static updateFirstName(clientId, firstName){
        clients[clientId].firstName = firstName;
        return true;
    }

    static remove(clientId){
        delete clients[clientId];
        return true;
    }

}

module.exports = Client;