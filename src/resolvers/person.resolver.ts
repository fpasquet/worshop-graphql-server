import { Resolver, Ctx, Root, ResolverInterface, FieldResolver } from 'type-graphql';

import { GraphqlContext } from '../config/graphql-context';

import { Book } from '../models/book';
import { Person } from '../models/person';

@Resolver(() => Person)
export class PersonResolver implements ResolverInterface<Person> {
  @FieldResolver(() => [Book], { name: 'books' })
  async books(@Root() person: Person, @Ctx() { repositories: { bookRepository } }: GraphqlContext): Promise<Book[]> {
    return bookRepository.findByPersonIdDataLoader().load(person.id);
  }
}
