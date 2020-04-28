import { createConnection, Connection } from 'typeorm';

import * as typeOrmConfig from '../config/typeorm.config';
import { Book } from '../models/book';
import { Category } from '../models/category';
import { Person } from '../models/person';

import * as bookFixtures from './book.json';

const loadBooks = async (connection: Connection): Promise<void> => {
  const categoryRepository = connection.getRepository(Category);

  const bookCategories = bookFixtures.categories.map((category) =>
    Object.assign(new Category(), {
      slug: category.slug,
      name: category.title,
    }),
  );
  await categoryRepository.save(bookCategories);

  const authorRepository = connection.getRepository(Person);

  const bookAuthors = bookFixtures.authors.map((author) => Object.assign(new Person(), author));
  await authorRepository.save(bookAuthors);

  const bookRepository = connection.getRepository(Book);
  const books = bookFixtures.books.map(({ languages, authorSlug, categorySlugs, ...book }) =>
    Object.assign(new Book(), {
      ...book,
      language: languages[0],
      author: bookAuthors.find((author) => author.slug === authorSlug),
      categories: bookCategories.filter((category) => categorySlugs.includes(category.slug)),
    }),
  );

  await bookRepository.save(books);
  console.log('Books is saved, relation authors and categories is created in the database too');
};

const loadFixtures = async (): Promise<void> => {
  let connection: Connection;

  try {
    connection = await createConnection(typeOrmConfig);
    await connection.synchronize(true);
    await loadBooks(connection);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

loadFixtures()
  .then(() => {
    console.log('Fixtures are successfully loaded.');
  })
  .catch((err) => console.log(err));
