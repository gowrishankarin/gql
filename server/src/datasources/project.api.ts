import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';

interface ProjectDocument {
  _id: ObjectId;
  name: string;
  description: string;
  status: string;
  clientId: ObjectId;

}

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
}

export default ProjectAPI;
