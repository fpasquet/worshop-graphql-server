import { ObjectType, Field, Int, ClassType } from 'type-graphql';

export interface PaginatedResponse<TItem> {
  total: number;
  hasMore: boolean;
  items: TItem[];
}

export const createPaginatedResponse = <TItem>(TItemClass: ClassType) => {
  @ObjectType(`Paginated${TItemClass.name}Response`)
  class PaginatedResponseClass {
    @Field(() => Int)
    total: number;

    @Field()
    hasMore: boolean;

    @Field(() => [TItemClass])
    items: TItem[];
  }

  return PaginatedResponseClass;
};
