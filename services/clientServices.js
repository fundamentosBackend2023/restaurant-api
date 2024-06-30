const clientDB = require('../libs/clients');
const boom = require('@hapi/boom');

class Client {
    constructor(){}

    static async getAll(){
        const myClients = await clientDB.find();
        return myClients;
    }

    static async getOne(clientId){
        const client = await clientDB.findById(clientId);
        if(!client){
            throw boom.notFound('client not found');
        }
        return client;
    }

    static async create(info){
        const client = new clientDB(info);
        await client.save()
        return true;
    }

    static async updateFirstName(clientId, firstName){
        const client = await this.getOne(clientId);
        client.firstName = firstName;
        await client.save();
        return true;
    }

    static async remove(clientId){
        await clientDB.findByIdAndDelete(clientId)
        return true;
    }

}

module.exports = Client;