import {Entity, model, property, hasMany} from '@loopback/repository';
import {Task} from './task.model';

@model()
export class Project extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  project_id: number;

  @property({
    type: 'string',
    required: true,
  })
  project_name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
  })
  roleId?: number;

  @property({
    type: 'number',
  })
  userProjectId?: number;

  @hasMany(() => Task)
  tasks: Task[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
