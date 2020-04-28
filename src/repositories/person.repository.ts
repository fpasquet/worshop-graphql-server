import { EntityRepository, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

import { Person } from '../models/person';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  protected dataLoaders: {
    findOneByPersonIdDataLoader?: DataLoader<number, Person>;
  } = {};

  public findOneByPersonIdDataLoader() {
    if (!this.dataLoaders.findOneByPersonIdDataLoader) {
      this.dataLoaders.findOneByPersonIdDataLoader = new DataLoader<number, Person>(async (ids: number[]) => {
        const entities = await this.createQueryBuilder('person')
          .where('id IN(:...personIds)', { personIds: ids })
          .getMany();

        return ids.map((id) => {
          return entities.find((entity) => entity.id === id);
        });
      });
    }

    return this.dataLoaders.findOneByPersonIdDataLoader;
  }
}
