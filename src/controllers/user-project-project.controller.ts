import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  UserProject,
  Project,
} from '../models';
import {UserProjectRepository} from '../repositories';

export class UserProjectProjectController {
  constructor(
    @repository(UserProjectRepository) protected userProjectRepository: UserProjectRepository,
  ) { }

  @get('/user-projects/{id}/projects', {
    responses: {
      '200': {
        description: 'Array of UserProject has many Project',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Project>,
  ): Promise<Project[]> {
    return this.userProjectRepository.projects(id).find(filter);
  }

  @post('/user-projects/{id}/projects', {
    responses: {
      '200': {
        description: 'UserProject model instance',
        content: {'application/json': {schema: getModelSchemaRef(Project)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof UserProject.prototype.project_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {
            title: 'NewProjectInUserProject',
            exclude: ['project_id'],
            optional: ['userProjectId']
          }),
        },
      },
    }) project: Omit<Project, 'project_id'>,
  ): Promise<Project> {
    return this.userProjectRepository.projects(id).create(project);
  }

  @patch('/user-projects/{id}/projects', {
    responses: {
      '200': {
        description: 'UserProject.Project PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {partial: true}),
        },
      },
    })
    project: Partial<Project>,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.userProjectRepository.projects(id).patch(project, where);
  }

  @del('/user-projects/{id}/projects', {
    responses: {
      '200': {
        description: 'UserProject.Project DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.userProjectRepository.projects(id).delete(where);
  }
}
