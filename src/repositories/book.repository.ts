import { EntityRepository, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

import { Book } from '../models/book';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  protected dataLoaders: {
    findByPersonIdDataLoader?: DataLoader<number, Book[]>;
  } = {};

  public findByPersonIdDataLoader() {
    if (!this.dataLoaders.findByPersonIdDataLoader) {
      this.dataLoaders.findByPersonIdDataLoader = new DataLoader<number, Book[]>(async (ids: number[]) => {
        const entities = await this.createQueryBuilder('book')
          .where('book.author_id IN(:...personIds)', { personIds: ids })
          .getMany();

        return ids.map((id) => {
          return entities.filter((entity) => entity.authorId === id);
        });
      });
    }

    return this.dataLoaders.findByPersonIdDataLoader;
  }
}
