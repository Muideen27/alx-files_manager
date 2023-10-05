import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const dbHost = process.env.DB_HOST || 'localhost';
        const dbPort = process.env.DB_PORT || 27017;
        const dbName = process.env.DB_DATABASE || 'files_manager';
        
        this.client = new MongoClient(`mongodb://${dbHost}:${dbPort}`, { useUnifiedTopology: true });
        
        this.client.connect()
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.error('MongoDB connection error:', err));
    }

    isAlive() {
        return !!this.client && this.client.isConnected();
    }

    async nbUsers() {
        const collection = this.client.db().collection('users');
        return collection.countDocuments();
    }

    async nbFiles() {
        const collection = this.client.db().collection('files');
        return collection.countDocuments();
    }
}

const dbClient = new DBClient();

export default dbClient;

