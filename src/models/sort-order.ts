import { registerEnumType } from 'type-graphql';

export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SORT_ORDER, { name: 'SORT_ORDER' });
