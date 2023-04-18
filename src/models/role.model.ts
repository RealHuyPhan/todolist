import {Entity, model, property, hasOne} from '@loopback/repository';
import {Project} from './project.model';

@model()
export class Role extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  user_id: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @hasOne(() => Project)
  project: Project;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
