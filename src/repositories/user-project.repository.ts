import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UserProject, UserProjectRelations, Project} from '../models';
import {ProjectRepository} from './project.repository';

export class UserProjectRepository extends DefaultCrudRepository<
  UserProject,
  typeof UserProject.prototype.project_id,
  UserProjectRelations
> {

  public readonly projects: HasManyRepositoryFactory<Project, typeof UserProject.prototype.project_id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>,
  ) {
    super(UserProject, dataSource);
    this.projects = this.createHasManyRepositoryFactoryFor('projects', projectRepositoryGetter,);
    this.registerInclusionResolver('projects', this.projects.inclusionResolver);
  }
}
