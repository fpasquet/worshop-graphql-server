import { ClassType, Resolver, Query, Args, Ctx, Mutation, Arg, ID, PubSub, Publisher } from 'type-graphql';

import { GraphqlContext, Repositories } from '../config/graphql-context';
import { capitalize } from '../services/string.service';
import { createPaginatedResponse } from '../models/paginated-response';
import { PaginationArgs } from '../models/args/pagination-args';
import { NotificationPayload } from '../models/notification';
import { Repository } from 'typeorm';

export const createCrudResolver = <T extends ClassType>(
  modelName: string,
  objectTypeCls: T,
  inputTypeCls?: any,
  filterTypeCls?: any,
) => {
  const PaginatedObjectTypeResponse = createPaginatedResponse(objectTypeCls);
  type PaginatedObjectTypeResponse = InstanceType<typeof PaginatedObjectTypeResponse>;

  @Resolver({ isAbstract: true })
  abstract class CrudResolver {
    getRepository(repositories: Repositories): Repository<any> {
      return repositories[`${modelName}Repository`];
    }

    @Query(() => PaginatedObjectTypeResponse, { name: `getAll${capitalize(modelName)}` })
    async getAll(
      @Ctx() { repositories }: GraphqlContext,
      @Args() { page, perPage, sortField, sortOrder }: PaginationArgs,
      @Arg('filter', () => filterTypeCls, { nullable: true }) filter?: T,
    ): Promise<PaginatedObjectTypeResponse> {
      const repository = this.getRepository(repositories);

      const offset = page === 1 ? 0 : (page - 1) * perPage;
      const [total, items] = await Promise.all([
        repository.count({ where: filter }),
        repository.find({
          skip: offset,
          take: perPage,
          order: {
            [sortField]: sortOrder,
          },
          where: filter,
        }),
      ]);

      return {
        total: total,
        hasMore: offset + items.length < total,
        items,
      };
    }

    @Query(() => objectTypeCls, { name: modelName, nullable: true })
    async findOne(@Ctx() { repositories }: GraphqlContext, @Arg('slug', () => String) slug: string): Promise<T | null> {
      const repository = repositories[`${modelName}Repository`];
      return repository.findOne({ slug });
    }

    @Mutation(() => objectTypeCls, { name: `save${capitalize(modelName)}` })
    async save(
      @Ctx() { repositories }: GraphqlContext,
      @Arg('id', () => ID, { nullable: true }) id: number,
      @Arg('input', () => inputTypeCls) input: any,
      @PubSub('NOTIFICATIONS') publish: Publisher<NotificationPayload>,
    ): Promise<T> {
      const repository = this.getRepository(repositories);
      if (id) {
        await repository.update(id, inputTypeCls);
        const model = repository.findOne(id);
        await publish({ message: `The ${modelName} with ID '${id}' has been updated` });
        return model;
      }

      const model = await repository.save(input);
      await publish({ message: `The ${modelName} with ID '${model.id}' has been added` });
      return model;
    }

    @Mutation(() => Boolean, { name: `delete${capitalize(modelName)}` })
    async delete(
      @Ctx() { repositories }: GraphqlContext,
      @Arg('id', () => ID, { nullable: true }) id: number,
      @PubSub('NOTIFICATIONS') publish: Publisher<NotificationPayload>,
    ): Promise<boolean> {
      const repository = this.getRepository(repositories);
      const { affected } = await repository.delete(id);

      if (affected === 0) {
        return false;
      }

      await publish({ message: `The ${modelName} with ID '${id}' has been deleted` });
      return true;
    }
  }

  return CrudResolver;
};
