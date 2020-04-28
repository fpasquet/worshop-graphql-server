import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql';
import { In } from 'typeorm';

import { createCrudResolver } from './crud.resolver';
import { GraphqlContext } from '../config/graphql-context';

import { Book } from '../models/book';
import { Category } from '../models/category';
import { Person } from '../models/person';
import { BookInput } from '../models/inputs/book-input';
import { BookFilter } from '../models/inputs/book-filter';

const BookCrudResolver = createCrudResolver('book', Book, BookInput, BookFilter);

@Resolver(() => Book)
export class BookResolver extends BookCrudResolver {
  @FieldResolver(() => [Category], { name: 'categories' })
  async categories(
    @Root() book: Book,
    @Ctx() { repositories: { categoryRepository } }: GraphqlContext,
  ): Promise<Category[]> {
    return book.categoryIds.length > 0 ? categoryRepository.find({ id: In(book.categoryIds) }) : [];
  }

  @FieldResolver(() => Person, { name: 'author' })
  async author(@Root() book: Book, @Ctx() { repositories: { personRepository } }: GraphqlContext): Promise<Person> {
    return personRepository.findOne(book.authorId);
  }
}
