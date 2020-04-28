import { ArgsType, Field, Int } from 'type-graphql';

import { SORT_ORDER } from '../sort-order';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  page = 1;

  @Field(() => Int)
  perPage = 15;

  @Field(() => String)
  sortField = 'id';

  @Field(() => SORT_ORDER)
  sortOrder: SORT_ORDER = SORT_ORDER.ASC;

  get offset(): number {
    return this.page === 1 ? 0 : (this.page - 1) * this.perPage;
  }
}
