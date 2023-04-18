import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Role, RoleRelations, Project} from '../models';
import {ProjectRepository} from './project.repository';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.user_id,
  RoleRelations
> {

  public readonly project: HasOneRepositoryFactory<Project, typeof Role.prototype.user_id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(Role, dataSource);
    this.project = this.createHasOneRepositoryFactoryFor('project', projectRepositoryGetter);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
  }
}
