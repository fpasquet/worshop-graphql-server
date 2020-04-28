import { InputType, Field, ID } from 'type-graphql';

import { Product } from '../product';

@InputType()
export abstract class ProductFilter implements Partial<Product> {
  @Field(() => [ID], { nullable: true })
  categoryIds?: [number];
}
