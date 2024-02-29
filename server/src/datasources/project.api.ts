import { MongoDataSource } from 'apollo-datasource-mongodb';
import { model, Schema, Types } from 'mongoose';

import { ObjectId } from 'mongodb';

interface ProjectDocument {
  _id: ObjectId;
  name: string;
  description: string;
  status: string;
  clientId: ObjectId;

}

const ProjectSchema = new Schema<ProjectDocument>({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  clientId: {
    type: ObjectId,
    ref: 'Client'
  },
});

const Project = model<ProjectDocument>('Project', ProjectSchema);

class ProjectAPI extends MongoDataSource<ProjectDocument> {
  constructor(options) {
    super(options);
  }
  getProject(projectId: string): Promise<ProjectDocument | null>  {
    return this.findOneById(projectId);
  }

  async findAll(): Promise<ProjectDocument[]> {
    const projectsCursor = this.collection.find({});
    return await projectsCursor.toArray()
  }

  async create({
    name, description, status, clientId
  }): Promise<ProjectDocument | null> {
    try {
      const project = new Project({ name, description, status, clientId})
      const result = this.collection.insertOne(project as ProjectDocument, {
        forceServerObjectId: false,
      });
      return project;

    } catch (error) {
      console.log({error});
      return error;
    }
  }

  async update({
    _id,
    name,
    description,
    status,
    clientId,
  }): Promise<ProjectDocument | null> {
    return await this.collection.updateOne({ _id }, {
      $set: {
        name,
        description,
        status,
        clientId,
      },
    });
  }

  async delete(_id: string): Promise<ProjectDocument | null> {
    return await this.collection.deleteOne({ _id });
  }
}

export default ProjectAPI;
