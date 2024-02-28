import { MongoDataSource  } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";

interface ClientDocument {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
}

class ClientAPI extends MongoDataSource<ClientDocument> {
  constructor(options) {
    super(options);
  }

  getClient(clientId: string): Promise<ClientDocument | null>  {
    const client = this.collection.findOne();
    return client;
  }

  async findAll(): Promise<ClientDocument[]> {
    const clientsCursor = this.collection.find({});
    return await clientsCursor.toArray()
  }
}

export default ClientAPI;
