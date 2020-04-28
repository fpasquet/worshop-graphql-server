import { Resolver, ResolverInterface } from 'type-graphql';

import { Person } from '../models/person';

@Resolver(() => Person)
export class PersonResolver implements ResolverInterface<Person> {}
