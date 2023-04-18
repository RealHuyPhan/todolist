import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Project} from './project.model';

@model()
export class Task extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  task_id?: number;

  @property({
    type: 'string',
  })
  task_description?: string;

  @property({
    type: 'boolean',
  })
  status?: boolean;

  @property({
    type: 'number',
  })
  expriseIn?: number;

  @property({
    type: 'number',
    required: true,
  })
  project_id: number;

  @belongsTo(() => Project)
  projectId: number;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
