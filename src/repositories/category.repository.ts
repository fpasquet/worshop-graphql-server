import { EntityRepository, Repository } from 'typeorm';

import { Category } from '../models/category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
