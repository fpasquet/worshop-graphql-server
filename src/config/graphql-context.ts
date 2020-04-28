import { Connection } from 'typeorm';

import { CategoryRepository } from '../repositories/category.repository';
import { BookRepository } from '../repositories/book.repository';
import { PersonRepository } from '../repositories/person.repository';

export interface Repositories {
  categoryRepository: CategoryRepository;
  bookRepository: BookRepository;
  personRepository: PersonRepository;
}

export interface GraphqlContext {
  repositories?: Repositories;
}

export const initRepositories = (connectionDatabase: Connection): Repositories => ({
  categoryRepository: connectionDatabase.getCustomRepository(CategoryRepository),
  bookRepository: connectionDatabase.getCustomRepository(BookRepository),
  personRepository: connectionDatabase.getCustomRepository(PersonRepository),
});
