import { Query, Resolver, Ctx } from 'type-graphql';

import { GraphqlContext } from '../config/graphql-context';

import { Category } from '../models/category';

@Resolver(() => Category)
export class CategoryResolver {
  @Query(() => [Category], { name: 'categories' })
  async categories(@Ctx() { repositories: { categoryRepository } }: GraphqlContext): Promise<Category[]> {
    return categoryRepository.find();
  }
}
