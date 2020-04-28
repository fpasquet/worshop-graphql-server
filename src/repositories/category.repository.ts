import { EntityRepository, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

import { Category } from '../models/category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  protected dataLoaders: {
    findByBookIdDataLoader?: DataLoader<number, Category[]>;
  } = {};

  public findByBookIdDataLoader() {
    if (!this.dataLoaders.findByBookIdDataLoader) {
      this.dataLoaders.findByBookIdDataLoader = new DataLoader<number, Category[]>(async (ids: number[]) => {
        const { raw, entities } = await this.createQueryBuilder('category')
          .addSelect('bc.book_id', 'book_id')
          .innerJoin('book_category', 'bc', 'bc.category_id = category.id')
          .where('bc.book_id IN(:...bookIds)', { bookIds: ids })
          .getRawAndEntities();

        return ids.map((id) => {
          return entities.filter((entity) => {
            const row = raw.find((row) => row.book_id === id);
            return row && row.category_id === entity.id;
          });
        });
      });
    }

    return this.dataLoaders.findByBookIdDataLoader;
  }
}
