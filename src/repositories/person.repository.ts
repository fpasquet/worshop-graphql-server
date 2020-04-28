import { EntityRepository, Repository } from 'typeorm';

import { Person } from '../models/person';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {}
