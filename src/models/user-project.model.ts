import {Entity, model, property, hasMany} from '@loopback/repository';
import {Project} from './project.model';

@model()
export class UserProject extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  project_id: number;

  @property({
    type: 'number',
    required: true,
  })
  user_id: number;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @hasMany(() => Project)
  projects: Project[];

  constructor(data?: Partial<UserProject>) {
    super(data);
  }
}

export interface UserProjectRelations {
  // describe navigational properties here
}

export type UserProjectWithRelations = UserProject & UserProjectRelations;
