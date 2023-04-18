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
  Role,
  Project,
} from '../models';
import {RoleRepository} from '../repositories';

export class RoleProjectController {
  constructor(
    @repository(RoleRepository) protected roleRepository: RoleRepository,
  ) { }

  @get('/roles/{id}/project', {
    responses: {
      '200': {
        description: 'Role has one Project',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Project),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Project>,
  ): Promise<Project> {
    return this.roleRepository.project(id).get(filter);
  }

  @post('/roles/{id}/project', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {'application/json': {schema: getModelSchemaRef(Project)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Role.prototype.user_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {
            title: 'NewProjectInRole',
            exclude: ['project_id'],
            optional: ['roleId']
          }),
        },
      },
    }) project: Omit<Project, 'project_id'>,
  ): Promise<Project> {
    return this.roleRepository.project(id).create(project);
  }

  @patch('/roles/{id}/project', {
    responses: {
      '200': {
        description: 'Role.Project PATCH success count',
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
    return this.roleRepository.project(id).patch(project, where);
  }

  @del('/roles/{id}/project', {
    responses: {
      '200': {
        description: 'Role.Project DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Project)) where?: Where<Project>,
  ): Promise<Count> {
    return this.roleRepository.project(id).delete(where);
  }
}
