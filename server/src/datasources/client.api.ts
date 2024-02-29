import { MongoDataSource  } from "apollo-datasource-mongodb";
import { ObjectId, UpdateResult, DeleteResult } from "mongodb";
import { model, Schema, Types } from 'mongoose';


interface ClientDocument {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
}

const ClientSchema = new Schema<ClientDocument>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const Client = model<ClientDocument>('Client', ClientSchema);

class ClientAPI extends MongoDataSource<ClientDocument> {
  constructor(options) {
    super(options);
  }

  getClient(clientId: string): Promise<ClientDocument | null>  {
    const client = this.findOneById(clientId);
    return client;
  }

  async findAll(): Promise<ClientDocument[]> {
    const clientsCursor = this.collection.find({});
    return await clientsCursor.toArray()
  }

  create({ name, email, phone }): Promise<ClientDocument | null> {
    try {
      const client = new Client({ name, email, phone});
      const result = this.collection.insertOne(client as ClientDocument, {
        forceServerObjectId: false,
      });
      return client;
    } catch (err) {
      return err;
    }
  }

  update({ id, name, email, phone }): Promise<UpdateResult<ClientDocument | null>> {
    const result = this.collection.updateOne({ "_id": id }, {
      $set: {
        name,
        email,
        phone,
      },
    });

    console.log({result})
    return result;
  }

  delete(id: ObjectId): Promise<DeleteResult | null> {
    const result = this.collection.deleteOne({ "_id": id });

    return result;
  }
}

export default ClientAPI;
