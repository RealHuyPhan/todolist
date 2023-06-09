import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Project, ProjectRelations, Task} from '../models';
import {TaskRepository} from './task.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.project_id,
  ProjectRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Task, typeof Project.prototype.project_id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TaskRepository') protected taskRepositoryGetter: Getter<TaskRepository>,
  ) {
    super(Project, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', taskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
